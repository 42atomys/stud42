package schema

import (
	"net/mail"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

type User struct {
	ent.Schema
}

func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New),
		field.String("email").Unique().NotEmpty().MaxLen(255).Validate(func(email string) (err error) {
			_, err = mail.ParseAddress(email)
			return
		}),
		field.String("duo_login").Unique().NotEmpty().MaxLen(255),
		field.Int("duo_id").Unique().NonNegative(),
		field.String("first_name").NotEmpty().MaxLen(255),
		field.String("usual_first_name").MaxLen(255),
		field.String("last_name").NotEmpty().MaxLen(255),
		field.String("phone").MaxLen(255),
		field.Int("pool_year").Positive(),
		field.Int("pool_month").Positive(),
		field.String("nickname").MaxLen(255),
		field.String("avatar_url").MaxLen(255),
		field.String("cover_url").MaxLen(255),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("accounts", Account.Type),
		edge.To("sessions", Session.Type),
	}
}

func (User) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("email").Unique(),
		index.Fields("duo_login").Unique(),
		index.Fields("duo_id").Unique(),
		index.Fields("nickname").Unique(),
	}
}
