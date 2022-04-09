package schema

import (
	"net/mail"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
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
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.String("email").Unique().NotEmpty().MaxLen(255).Validate(func(email string) (err error) {
			_, err = mail.ParseAddress(email)
			return
		}),
		field.String("duo_login").Unique().NotEmpty().MaxLen(255),
		field.Int("duo_id").Unique().NonNegative(),
		field.String("first_name").NotEmpty().MaxLen(255),
		field.String("usual_first_name").Nillable().Optional().MaxLen(255),
		field.String("last_name").NotEmpty().MaxLen(255),
		field.String("phone").MaxLen(255),
		field.String("pool_year"),
		field.String("pool_month"),
		field.String("nickname").Optional().Nillable().Unique().MaxLen(255),
		field.String("avatar_url").Optional().Nillable().MaxLen(255),
		field.String("cover_url").Optional().Nillable().MaxLen(255),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("accounts", Account.Type),
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
