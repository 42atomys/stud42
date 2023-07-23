package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

type Location struct {
	ent.Schema
}

func (Location) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("campus_id", uuid.UUID{}),
		field.Int("duo_id").Unique().NonNegative(),
		field.Time("begin_at"),
		field.Time("end_at").Nillable().Optional(),
		field.String("identifier").NotEmpty().MaxLen(255),
		field.Int("user_duo_id").NonNegative(),
		field.String("user_duo_login").NotEmpty().MaxLen(255),
	}
}

func (Location) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("campus", Campus.Type).Required().Field("campus_id").Ref("locations").Unique(),
		edge.From("user", User.Type).Required().Field("user_id").Ref("locations").Unique(),
	}
}

func (Location) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("duo_id").Unique(),
		index.Fields("user_id").Annotations(entsql.IndexAnnotation{Type: "gin"}),
		index.Fields("identifier"),
		index.Fields("end_at").StorageKey("locations_actives_idx").Annotations(
			entsql.IndexWhere("end_at IS NULL"),
		),
	}
}
