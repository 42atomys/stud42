package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// NoticesUser holds the schema definition for the NoticesUser entity.
type NoticesUser struct {
	ent.Schema
}

// Fields of the NoticesUser.
func (NoticesUser) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("notice_id", uuid.UUID{}),
		field.Time("read_at").Optional().Nillable().Default(time.Now),
	}
}

// Edges of the NoticesUser.
func (NoticesUser) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user", User.Type).
			Unique().
			Required().
			Field("user_id"),
		edge.To("notice", Notice.Type).
			Unique().
			Required().
			Field("notice_id"),
	}
}
