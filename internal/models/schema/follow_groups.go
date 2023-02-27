package schema

import (
	"context"
	"fmt"

	"atomys.codes/stud42/internal/models/gotype"
	"atomys.codes/stud42/pkg/utils"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

type FollowsGroup struct {
	ent.Schema
}

func (FollowsGroup) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Unique().Immutable().Default(uuid.New).Annotations(entsql.Annotation{
			Default: "uuid_generate_v4()",
		}),
		field.UUID("user_id", uuid.UUID{}),

		field.Enum("kind").GoType(gotype.FollowsGroupKind("")).Default(gotype.FollowsGroupKindManual.String()),
		field.String("name").MaxLen(50),
		field.String("slug").MaxLen(50).Validate(func(slug string) error {
			if !utils.SlugifyRegex.Match([]byte(slug)) {
				return fmt.Errorf("slug %q is not valid", slug)
			}
			return nil
		}),
		field.String("color").MaxLen(8),
		field.String("emoji").MaxLen(2),
	}
}

func (FollowsGroup) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Required().Field("user_id").Ref("follows_groups").Unique(),

		edge.To("follows", Follow.Type),
	}
}

func (FollowsGroup) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("user_id", "name").Unique(),
		index.Fields("user_id", "slug").Unique(),
	}
}

func (FollowsGroup) Hooks() []ent.Hook {
	return []ent.Hook{
		updateSlugHook,
	}
}

// updateSlugHook is a hook that updates the slug field when the name field is
// updated. It is used to ensure that the slug is always up-to-date.
func updateSlugHook(next ent.Mutator) ent.Mutator {
	return ent.MutateFunc(func(ctx context.Context, m ent.Mutation) (ent.Value, error) {
		if !m.Op().Is(ent.OpCreate | ent.OpUpdate) {
			return next.Mutate(ctx, m)
		}

		if name, ok := m.Field("name"); ok {
			if err := m.SetField("slug", utils.Slugify(name.(string))); err != nil {
				return nil, err
			}
		}

		return next.Mutate(ctx, m)
	})
}
