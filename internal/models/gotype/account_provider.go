package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type AccountProvider string

const (
	AccountProviderDuo       AccountProvider = "DUO"
	AccountProviderDiscord   AccountProvider = "DISCORD"
	AccountProviderGithub    AccountProvider = "GITHUB"
	AccountProviderGitlab    AccountProvider = "GITLAB"
	AccountProviderInstagram AccountProvider = "INSTAGRAM"
	AccountProviderLinkedIn  AccountProvider = "LINKEDIN"
	AccountProviderReddit    AccountProvider = "REDDIT"
	AccountProviderSpotify   AccountProvider = "SPOTIFY"
	AccountProviderTwitch    AccountProvider = "TWITCH"
	AccountProviderTwitter   AccountProvider = "TWITTER"
)

var AllAccountProvider = []AccountProvider{
	AccountProviderDuo,
	AccountProviderDiscord,
	AccountProviderGithub,
	AccountProviderGitlab,
	AccountProviderInstagram,
	AccountProviderLinkedIn,
	AccountProviderReddit,
	AccountProviderSpotify,
	AccountProviderTwitch,
	AccountProviderTwitter,
}

func (e AccountProvider) Values() []string {
	values := make([]string, len(AllAccountProvider))
	for i := range AllAccountProvider {
		values[i] = AllAccountProvider[i].String()
	}
	return values
}

func (e AccountProvider) IsValid() bool {
	switch e {
	case AccountProviderDuo, AccountProviderDiscord, AccountProviderGithub,
		AccountProviderGitlab, AccountProviderInstagram, AccountProviderLinkedIn,
		AccountProviderReddit, AccountProviderSpotify, AccountProviderTwitch,
		AccountProviderTwitter:
		return true
	}
	return false
}

func (e AccountProvider) String() string {
	return string(e)
}

func (e *AccountProvider) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountProvider(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountProvider", str)
	}
	return nil
}

func (e AccountProvider) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
