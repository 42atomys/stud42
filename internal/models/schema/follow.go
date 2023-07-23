package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type Follow struct {
	ent.Schema
}

func (Follow) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("follow_id", uuid.UUID{}),
	}
}

func (Follow) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user", User.Type).Field("user_id").Unique().Required(),
		edge.To("follow", User.Type).Field("follow_id").Unique().Required(),

		edge.From("follow_groups", FollowsGroup.Type).Ref("follows"),
	}
}

func (Follow) Indexes() []ent.Index {
	return []ent.Index{}
}

func (Follow) Hooks() []ent.Hook {
	return []ent.Hook{}
}
