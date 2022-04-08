package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

type Account struct {
	ent.Schema
}

func (Account) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New),
		field.String("type").NotEmpty().MaxLen(255),
		field.String("provider").NotEmpty().MaxLen(255),
		field.String("provider_account_id").NotEmpty().MaxLen(255),
		field.Int("expires_at").NonNegative(),
		field.String("token_type").NotEmpty().MaxLen(255),
		field.String("refresh_token").Unique().NotEmpty(),
		field.String("access_token").Unique().NotEmpty(),
		field.String("scope").NotEmpty().MaxLen(255),
		field.String("id_token").Unique().NotEmpty(),
		field.String("session_state").NotEmpty(),
		field.UUID("user_id", uuid.UUID{}),
	}
}

func (Account) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Required().Ref("accounts"),
	}
}

func (Account) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("provider", "provider_account_id").Unique(),
		index.Fields("user_id", "provider").Unique(),
	}
}
