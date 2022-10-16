package schema

import (
	"context"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/getsentry/sentry-go"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"atomys.codes/stud42/internal/cache"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/hook"
	"atomys.codes/stud42/internal/models/gotype"
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
			// TODO: ParseAddress return an error on Update
			// generated: validator failed for field \"User.email\": mail: no angle-addr
			// ( email failed : xx@42xxxxxx.xxx )
			// _, err = mail.ParseAddress(email)
			return
		}),
		field.String("duo_login").Unique().NotEmpty().MaxLen(255),
		field.Int("duo_id").Unique().NonNegative(),
		field.String("first_name").NotEmpty().MaxLen(255),
		field.String("usual_first_name").Nillable().Optional().MaxLen(255),
		field.String("last_name").NotEmpty().MaxLen(255),
		field.String("phone").Optional().Nillable().MaxLen(255),
		field.String("pool_year").Optional().Nillable(),
		field.String("pool_month").Optional().Nillable(),
		field.String("nickname").Optional().Nillable().Unique().MaxLen(255),
		field.String("duo_avatar_url").Optional().Nillable().MaxLen(255),
		field.String("avatar_url").Optional().Nillable().MaxLen(255),
		field.String("cover_url").Optional().Nillable().MaxLen(255),
		field.UUID("current_location_id", uuid.UUID{}).Nillable().Optional(),
		field.UUID("current_campus_id", uuid.UUID{}).Nillable().Optional(),
		field.Bool("is_staff").Default(false),
		field.Bool("is_a_user").Default(false),
		field.JSON("flags_list", []string{}).Default([]string{}).Optional(),
		field.JSON("settings", gotype.Settings{}).Default(gotype.DefaultSettings).Optional(),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("accounts", Account.Type).Annotations(entsql.Annotation{OnDelete: entsql.Cascade}),
		edge.To("following", User.Type).From("followers").Annotations(entsql.Annotation{OnDelete: entsql.Cascade}),
		edge.To("locations", Location.Type).Annotations(entsql.Annotation{OnDelete: entsql.Cascade}),
		edge.To("current_location", Location.Type).
			Unique().
			Field("current_location_id").
			Annotations(entsql.Annotation{OnDelete: entsql.Cascade}),
		edge.To("current_campus", Campus.Type).
			Unique().
			Field("current_campus_id"),
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

func (User) Hooks() []ent.Hook {
	return []ent.Hook{
		hookUserCacheClear(),
	}
}

// hookUserCacheClear will automatically clean the cache of the "updated used"
// to prevent mismatch between user cache and database statement.
func hookUserCacheClear() ent.Hook {
	hk := func(next modelgen.Mutator) modelgen.Mutator {
		return hook.UserFunc(func(ctx context.Context, m *modelgen.UserMutation) (modelgen.Value, error) {
			userCache := cache.NewTyped[*modelgen.User](m.Cache)

			id, exist := m.ID()
			if !exist {
				goto MUTATE
			}

			if err := userCache.Delete(ctx, cache.CurrentUserCacheKey.WithParts(id.String()).Build()); err != nil {
				sentry.CaptureException(err)
				log.Error().Err(err).Msg("Cannot clear the current user cache")
			}

		MUTATE:
			return next.Mutate(ctx, m)
		})
	}
	// Limit the hook operations.
	return hook.On(hk, modelgen.OpCreate|modelgen.OpUpdate|modelgen.OpUpdateOne)
}
