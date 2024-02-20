package webhooks

import (
	"context"
	"errors"
	"os"
	"strconv"
	"strings"

	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog/log"
	"github.com/streadway/amqp"

	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/internal/models/generated"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/internal/models/gotype"
	"atomys.codes/stud42/pkg/duoapi"
	"atomys.codes/stud42/pkg/utils"
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
			if errors.Is(err, ErrInvalidWebhook) {
				goto ACK
			}

			// Send the message to the dead letter queue if the error is not a
			// ErrInvalidWebhook
			sentry.CaptureEvent(&sentry.Event{
				Level: sentry.LevelError,
				Contexts: map[string]interface{}{
					"message": string(d.Body),
				},
				Message: err.Error(),
			})

			if err = d.Nack(false, false); err != nil {
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
	webhook, err := unmarshalWebhook[githubWebhookMetadata, any](data)
	if err != nil {
		return err
	}

	if webhook == nil || webhook.Metadata.SpecName == "" {
		log.Error().Str("payload", string(data)).Msg("Webhook metadata is invalid")
		return ErrInvalidWebhook
	}

	handler := strings.Split(webhook.Metadata.SpecName, "-")[0]

	log.Debug().Msgf("Received a message[%s](%s): %+v", handler, webhook.Metadata.SpecName, webhook.Payload)
	switch handler {
	case "github":
		return p.githubHandler(data)
	case "duo":
		return p.duoHandler(data)
	default:
		log.Error().Str("handler", handler).Msg("Unknown handler")
	}

	return nil
}

// githubHandler is the processor for the github webhooks.
func (p *processor) githubHandler(data []byte) error {
	webhook, err := unmarshalWebhook[githubWebhookMetadata, githubWebhookPayload](data)
	if err != nil {
		return err
	}

	user, err := p.db.User.
		Query().
		Where(
			user.HasAccountsWith(
				account.ProviderEQ(gotype.AccountProviderGithub),
				account.ProviderAccountID(strconv.Itoa(webhook.Payload.Sender.ID)),
			),
		).
		First(p.ctx)
	if err != nil && !generated.IsNotFound(err) {
		return err
	} else if generated.IsNotFound(err) {
		return nil
	}

	var flags = user.Flags
	switch webhook.Metadata.Event {
	case "star":
		if webhook.Payload.Action == "created" {
			flags = append(flags, gotype.UserFlagStargazer)
		} else {
			flags = utils.Remove(flags, gotype.UserFlagStargazer)
		}
	case "sponsorship":
		webhook, _ := unmarshalWebhook[githubWebhookMetadata, githubSponsorshipWebhookPayload](data)
		// Do nothing if the sponsorship is one time. The sponsorship is
		// automatically cancelled after the first payment and create a double
		// webhook. The first webhook is the created event and the second is the
		// cancelled event.
		// FUTURE: Handle the one time sponsorship for one month.
		if webhook.Payload.Sponsorship.Tier.IsOneTime {
			return nil
		}

		if utils.Contains([]string{"created", "edited"}, webhook.Payload.Action) {
			flags = append(flags, gotype.UserFlagSponsor)
		} else if webhook.Payload.Action == "cancelled" {
			flags = utils.Remove(flags, gotype.UserFlagSponsor)
		}
	}

	_, err = p.db.User.UpdateOne(user).SetFlags(utils.Uniq(flags)).Save(p.ctx)
	return err
}

// duoHandler is the processor for the duo webhooks.
func (p *processor) duoHandler(data []byte) error {
	webhook, err := unmarshalWebhook[duoapi.WebhookMetadata, any](data)
	if err != nil {
		return err
	}

	var modelToFunction = map[string]func([]byte, duoapi.WebhookMetadata, *processor) error{
		"campus_user": unmarshalAndProcessCampusUser,
		"location":    unmarshalAndProcessLocation,
		"user":        unmarshalAndProcessUser,
	}

	if function, exists := modelToFunction[webhook.Metadata.Model]; exists {
		err = function(data, webhook.Metadata, p)
		if err != nil {
			log.Error().Err(err).Str("model", webhook.Metadata.Model).Str("event", webhook.Metadata.Event).Msg("Failed to process webhook")
			return err
		}
	} else {
		log.Error().Str("model", webhook.Metadata.Model).Msg("Unknown model")
	}

	if err != nil {
		log.Error().Err(err).Str("model", webhook.Metadata.Model).Str("event", webhook.Metadata.Event).Msg("Failed to process webhook")
		return err
	}

	return nil
}
