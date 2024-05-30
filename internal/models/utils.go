package modelsutils

import (
	"context"
	"fmt"

	"github.com/getsentry/sentry-go"
	"github.com/pkg/errors"
	"github.com/rs/zerolog/log"

	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

// WithTx is a helper function to wrap a function call with a transaction.
// If the function returns an error, the transaction is rolled back.
// If the function returns nil, the transaction is committed.
// See https://entgo.io/docs/transactions/#best-practices
func WithTx(ctx context.Context, client *modelgen.Client, fn func(tx *modelgen.Tx) error) error {
	tx, err := client.Tx(ctx)
	if err != nil {
		return err
	}
	defer func() {
		if v := recover(); v != nil {
			if err := tx.Rollback(); err != nil {
				log.Error().Err(err).Msg("failed to rollback transaction")
				sentry.CaptureException(err)
			}
			log.Error().Err(v.(error)).Msg("Error in transaction")
			sentry.CaptureException(v.(error))
		}
	}()
	if err := fn(tx); err != nil {
		if rerr := tx.Rollback(); rerr != nil {
			err = fmt.Errorf("rolling back transaction: %w", rerr)
		}
		return err
	}
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("committing transaction: %w", err)
	}
	return nil
}

func UserFirstOrCreateFromComplexLocation(ctx context.Context, l *duoapi.Location[duoapi.ComplexLocationUser]) (*modelgen.User, error) {
	u, err := client.User.Query().Where(user.DuoID(l.User.ID)).Only(ctx)
	if err != nil {
		if modelgen.IsNotFound(err) {
			err := client.User.Create().
				SetEmail(l.User.Email).
				SetDuoID(l.User.ID).
				SetDuoLogin(l.User.Login).
				SetFirstName(l.User.FirstName).
				SetLastName(l.User.LastName).
				SetUsualFirstName(l.User.UsualFirstName).
				SetPoolMonth(l.User.PoolMonth).
				SetPoolYear(l.User.PoolYear).
				SetDuoAvatarURL(l.User.Image.Link).
				SetDuoAvatarSmallURL(l.User.Image.Versions.Small).
				SetIsStaff(l.User.Staff).
				SetIsAUser(false).
				OnConflictColumns(user.FieldDuoID).
				DoNothing().
				Exec(ctx)
			if err != nil {
				return nil, errors.Wrap(err, "failed to create user")
			}
			u, err = client.User.Query().Where(user.DuoID(l.User.ID)).Only(ctx)
			if err != nil {
				return nil, errors.Wrap(err, "failed to get user")
			}
		} else {
			return nil, errors.Wrap(err, "unknown error")
		}
	}

	return u, nil
}

func UserFirstOrCreateFromLocation(ctx context.Context, l *duoapi.Location[duoapi.LocationUser]) (*modelgen.User, error) {
	u, err := client.User.Query().Where(user.DuoID(l.User.ID)).Only(ctx)
	if err != nil {
		exist, err := userExist(ctx, l.User)
		if err != nil {
			return nil, err
		}

		if exist {
			// User exist but dont match login / id
			// Ensure to clean the old data before the re-creation
			_, err := client.User.Delete().Where(user.And(user.DuoLogin(l.User.Login), user.IsAUser(false))).Exec(ctx)
			if err != nil {
				return nil, fmt.Errorf("cannot clean old login data: %w", err)
			}
		}

		log.Debug().Str("login", l.User.Login).Int("duoID", l.User.ID).Msg("user don't exist import it with duopai")
		duoUser, err := duoapi.UserGet(ctx, fmt.Sprint(l.User.ID))
		if err != nil {
			return nil, err
		}

		id, err := client.User.Create().
			SetEmail(duoUser.Email).
			SetDuoID(l.User.ID).
			SetDuoLogin(l.User.Login).
			SetFirstName(duoUser.FirstName).
			SetLastName(duoUser.LastName).
			SetUsualFirstName(duoUser.UsualFirstName).
			SetPoolMonth(duoUser.PoolMonth).
			SetPoolYear(duoUser.PoolYear).
			SetDuoAvatarURL(duoUser.Image.Link).
			SetDuoAvatarSmallURL(duoUser.Image.Versions.Small).
			SetIsStaff(duoUser.Staff).
			SetIsAUser(false).
			OnConflictColumns(user.FieldDuoID).
			DoNothing().
			ID(ctx)
		if err != nil {
			log.Debug().Err(err).Msg("error creating user")
			return nil, err
		}
		u, err = client.User.Get(ctx, id)
		if err != nil {
			log.Debug().Err(err).Msg("failed to get user")
			return nil, err
		}
	}

	return u, nil
}

// This function is only here to fix inconsistant data coming from intranet
func userExist(ctx context.Context, u duoapi.LocationUser) (bool, error) {
	// Check by ID
	n, err := client.User.Query().Where(
		user.Or(
			user.DuoID(u.ID),
			user.DuoLogin(u.Login),
		),
	).Count(ctx)
	if err != nil && !modelgen.IsNotFound(err) {
		return false, err
	}

	return n > 0, nil
}
