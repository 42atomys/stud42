package webhooks

import (
	"context"
	"encoding/json"

	"github.com/rs/zerolog/log"
	"github.com/streadway/amqp"

	modelsutils "atomys.codes/stud42/internal/models"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/pkg/duoapi"
)

type processor struct {
	db  *modelgen.Client
	ctx context.Context
}

func New() *processor {
	if err := modelsutils.Connect(); err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}

	return &processor{
		ctx: context.Background(),
		db:  modelsutils.Client(),
	}
}

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

	ch.Qos(5, 0, false)
	msgs, err := ch.Consume(
		channel,              // queue
		"webhooks-processor", // consumer
		false,                // auto-ack
		false,                // exclusive
		false,                // no-local
		false,                // no-wait
		nil,                  // args
	)
	if err != nil {
		return err
	}

	log.Info().Msg("Consumer ready. Waiting for messages...")
	for d := range msgs {
		log.Debug().Msg("Received a message")
		err := p.handler(d.Body)
		if err != nil {
			if err = d.Nack(false, true); err != nil {
				log.Error().Err(err).Msg("Cannot nack the message")
			}
			continue
		}
		if err := d.Ack(false); err != nil {
			log.Error().Err(err).Msg("Cannot ack the message")
		}
	}
	return nil
}

func (p *processor) handler(data []byte) error {
	md := &duoapi.Webhook{}

	if err := json.Unmarshal(data, &md); err != nil {
		log.Error().Err(err).Msg("Failed to unmarshal webhook metadata")
	}

	log.Debug().Msgf("Received a message(%s.%s): %+v", md.Metadata.Model, md.Metadata.Event, md.Payload)
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
