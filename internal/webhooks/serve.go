package webhooks

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"strconv"

	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog/log"
	"github.com/streadway/amqp"

	typesgen "atomys.codes/stud42/internal/api/generated/types"
	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/internal/models/generated"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type processor struct {
	db  *modelgen.Client
	ctx context.Context
}

// ErrInvalidWebhook is returned when the webhook is invalid and cannot be processed
// by the processor due to missing metadata key
var ErrInvalidWebhook = errors.New("invalid webhook, metadata is empty")

// New creates a new webhooks processor instance
func New() *processor {
	if err := modelsutils.Connect(); err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}

	return &processor{
		ctx: context.Background(),
		db:  modelsutils.Client(),
	}
}

// Serve starts the webhooks processor and listens for incoming message from
// the RabbitMQ queue "webhooks-processor" filled by the webhooked project.
//
// See https://github.com/42Atomys/webhooked
func (p *processor) Serve(amqpUrl, channel string) error {
	conn, err := amqp.Dial(amqpUrl)
	if err != nil {
		return err
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	if err := ch.Qos(5, 0, false); err != nil {
		return err
	}

	consumerID := "webhooks-processor"
	if os.Getenv("POD_IP") != "" {
		consumerID = "webhooks-processor-" + os.Getenv("POD_IP")
	}

	msgs, err := ch.Consume(
		channel,    // queue
		consumerID, // consumer
		false,      // auto-ack
		false,      // exclusive
		false,      // no-local
		false,      // no-wait
		nil,        // args
	)
	if err != nil {
		return err
	}

	log.Info().Msg("Consumer ready. Waiting for messages...")
	for d := range msgs {
		err := p.handler(d.Body)
		if err != nil {
			sentry.CaptureException(err)

			if errors.Is(err, ErrInvalidWebhook) {
				goto ACK
			}

			if err = d.Nack(false, true); err != nil {
				sentry.CaptureException(err)
				log.Error().Err(err).Msg("Cannot nack the message")
			}
			continue
		}

	ACK:
		if err := d.Ack(false); err != nil {
			log.Error().Err(err).Msg("Cannot ack the message")
			sentry.CaptureException(err)
		}
	}

	return nil
}

// handler is the main function that processes the webhooks. It parses the
// webhook metadata and calls the appropriate processor function.
// This function is called by the Serve function on each incoming message.
func (p *processor) handler(data []byte) error {
	md := &duoapi.Webhook{}

	if err := json.Unmarshal(data, &md); err != nil {
		log.Error().Err(err).Msg("Failed to unmarshal webhook metadata")
	}

	if md == nil || md.Metadata == nil {
		log.Error().Str("payload", string(data)).Msg("Webhook metadata is nil")
		return ErrInvalidWebhook
	}
	log.Debug().Msgf("Received a message(%s.%s): %+v", md.Metadata.Model, md.Metadata.Event, md.Payload)

	// TODO: implement the processor for github and other webhooks
	// Why: Bet need to be open and github sponsorship is a requirement to open it
	if md.Metadata.SpecName == "github-sponsorships" {
		return p.githubHandler(data)
	}

	var err error
	switch md.Metadata.Model {
	case "location":
		err = md.Payload.ProcessWebhook(p.ctx, md.Metadata, &locationProcessor{processor: p})
	case "user":
		err = md.Payload.ProcessWebhook(p.ctx, md.Metadata, &userProcessor{processor: p})
	}
	if err != nil {
		log.Error().Err(err).Str("model", md.Metadata.Model).Str("event", md.Metadata.Event).Msg("Failed to process webhook")
		return err
	}

	return nil
}

func (p *processor) githubHandler(data []byte) error {
	webhookPayload := &GithubSponsorshipWebhook{}
	if err := json.Unmarshal(data, &webhookPayload); err != nil {
		log.Error().Err(err).Msg("Failed to unmarshal webhook payload")
		return err
	}

	sentry.CaptureEvent(&sentry.Event{
		Level:   sentry.LevelInfo,
		Message: "Received a message(github-sponsorships)",
		Extra: map[string]interface{}{
			"webhook": webhookPayload,
		},
	})

	_, err := p.db.User.
		Query().
		Where(
			user.HasAccountsWith(
				account.Provider(typesgen.ProviderGithub.String()),
				account.ProviderAccountID(strconv.Itoa(webhookPayload.Sender.ID)),
			),
		).
		First(p.ctx)
	if err != nil && !generated.IsNotFound(err) {
		return err
	} else if generated.IsNotFound(err) {
		return nil
	}

	switch webhookPayload.Action {
	case "created":
	case "edited":
	case "cancelled":
	}

	return nil
}
