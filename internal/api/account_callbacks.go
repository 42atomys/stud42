package api

import (
	"context"

	typesgen "atomys.codes/stud42/internal/api/generated/types"
	"atomys.codes/stud42/internal/discord"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/utils"
	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog/log"
)

// accountLinkCallback is the callback for all accounts. This is used to define
// an asynchronous callback for each account type that will be called when the
// account is linked to a user.
func accountLinkCallback(ctx context.Context, db *modelgen.Client, account *modelgen.Account) {
	// Create a background context to avoid the context to be canceled when the
	// request is finished.
	bgCtx := context.Background()

	switch account.Provider {
	case string(typesgen.ProviderDiscord):
		discordLinkCallback(bgCtx, db, account)
	case string(typesgen.ProviderGithub):
		githubLinkCallback(bgCtx, db, account)
	case string(typesgen.ProviderDuo):
		duoLinkCallback(bgCtx, db, account)
	default:
		log.Warn().Str("accountType", account.Type).Msg("no callback is defined")
	}
}

// duoLinkCallback is the callback for 42 (DUO) accounts when the account is
// linked to an user. Only happened when an User will connect itself for the
// first time
func duoLinkCallback(ctx context.Context, db *modelgen.Client, account *modelgen.Account) {
	user, err := account.User(ctx)
	if err != nil {
		log.Error().Err(err).Msg("failed to retrieve user")
		sentry.CaptureException(err)
		return
	}

	if err := db.User.UpdateOne(user).SetIsAUser(true).Exec(ctx); err != nil {
		log.Error().Err(err).Msg("failed to update user")
		sentry.CaptureException(err)
	}
}

// discordLinkCallback is the callback for Discord accounts when the account is
// linked to an user. It will add the user to the Discord server.
func discordLinkCallback(ctx context.Context, db *modelgen.Client, account *modelgen.Account) {
	// Invite the user to the S42 server using the Discord API
	err := discord.
		DefaultClient().
		InviteOnOurDiscord(ctx, account.AccessToken, account.ProviderAccountID)
	if err != nil {
		sentry.CaptureException(err)
	}
}

// githubLinkCallback is the callback for Github accounts when the account is
// linked to an user. It will follow the creator of the repository and star
// the repository.
func githubLinkCallback(ctx context.Context, db *modelgen.Client, account *modelgen.Account) {
	var err error
	// Give beta access to the user
	u, err := db.User.Query().Where(user.ID(account.UserID)).First(ctx)
	if err != nil {
		log.Error().Err(err).Msg("failed to retrieve user")
		sentry.CaptureException(err)
		return
	}

	u.FlagsList = append(u.FlagsList, typesgen.FlagBeta.String())
	err = db.User.UpdateOne(u).SetFlagsList(utils.Uniq(u.FlagsList)).Exec(ctx)
	if err != nil {
		log.Error().Err(err).Msg("failed to give beta access to the user")
		sentry.CaptureException(err)
	}
}
