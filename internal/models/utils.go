package modelsutils

import (
	"context"
	"fmt"

	"github.com/rs/zerolog/log"

	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

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
				SetPhone(l.User.Phone).
				SetPoolMonth(l.User.PoolMonth).
				SetPoolYear(l.User.PoolYear).
				SetIsStaff(l.User.Staff).
				SetIsAUser(false).
				OnConflictColumns(user.FieldDuoID).
				DoNothing().
				Exec(ctx)
			if err != nil {
				return nil, err
			}
			u, err = client.User.Query().Where(user.DuoID(l.User.ID)).Only(ctx)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	return u, err
}

func UserFirstOrCreateFromLocation(ctx context.Context, l *duoapi.Location[duoapi.LocationUser]) (*modelgen.User, error) {
	u, err := client.User.Query().Where(user.DuoID(l.User.ID)).Only(ctx)
	if err != nil {
		if modelgen.IsNotFound(err) {
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
				SetPhone(duoUser.Phone).
				SetPoolMonth(duoUser.PoolMonth).
				SetPoolYear(duoUser.PoolYear).
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
		} else {
			return nil, err
		}
	}

	return u, nil
}
