package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type UserFlag string

const (
	UserFlagStaff        UserFlag = "STAFF"
	UserFlagCollaborator UserFlag = "COLLABORATOR"
	UserFlagContributor  UserFlag = "CONTRIBUTOR"
	UserFlagSponsor      UserFlag = "SPONSOR"
	UserFlagBeta         UserFlag = "BETA"
	UserFlagDiscord      UserFlag = "DISCORD"
)

var (
	UserAllFlag = []UserFlag{
		UserFlagStaff,
		UserFlagCollaborator,
		UserFlagContributor,
		UserFlagSponsor,
		UserFlagBeta,
		UserFlagDiscord,
	}

	DefaultUserFlag = []UserFlag{}
)

func (e UserFlag) IsValid() bool {
	switch e {
	case UserFlagStaff, UserFlagCollaborator, UserFlagContributor,
		UserFlagSponsor, UserFlagBeta, UserFlagDiscord:
		return true
	}
	return false
}

func (e UserFlag) String() string {
	return string(e)
}

func (e *UserFlag) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = UserFlag(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid UserFlag", str)
	}
	return nil
}

func (e UserFlag) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
