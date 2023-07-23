package schema

import (
	"errors"
	"regexp"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"

	"atomys.codes/stud42/internal/models/gotype"
)

type Notice struct {
	ent.Schema
}

func (Notice) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.String("slug").Unique().NotEmpty().MaxLen(255).Validate(func(s string) error {
			if regexp.MustCompile(`^[a-z][a-z0-9-]*$`).MatchString(s) {
				return nil
			}
			return errors.New("must be always akebab-case (lowercase and dash) and not start with a dash")
		}),
		field.String("message"),
		field.String("icon").NotEmpty().MaxLen(255),
		field.Enum("color").GoType(gotype.NoticeColor("")).Default(gotype.NoticeColorBlack.String()),
		field.Bool("is_active").Default(true),
		field.Time("created_at").Immutable().Annotations(entsql.Annotation{
			Default: "CURRENT_TIMESTAMP",
		}),
	}
}

func (Notice) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("readers", User.Type).
			Ref("readed_notices").
			Through("notices_users", NoticesUser.Type),
	}
}

func (Notice) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("slug").Unique(),
	}
}

func (Notice) Hooks() []ent.Hook {
	return []ent.Hook{}
}
