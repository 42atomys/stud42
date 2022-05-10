package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

type Campus struct {
	ent.Schema
}

func (Campus) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.Int("duo_id").Unique().NonNegative(),
		field.String("name").NotEmpty().MaxLen(255),
		field.String("time_zone").NotEmpty().MaxLen(255),
		field.String("language_code").NotEmpty().MaxLen(5),
		field.String("country"),
		field.String("zip"),
		field.String("city"),
		field.String("address"),
		field.String("email_extension"),
		field.Bool("active"),
		field.String("website"),
		field.String("twitter"),
	}
}

func (Campus) Edges() []ent.Edge {
	return []ent.Edge{}
}

func (Campus) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("duo_id").Unique(),
		index.Fields("name").Unique(),
	}
}
