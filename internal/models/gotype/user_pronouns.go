package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type UserPronoun string

const (
	UserPronounPrivate  UserPronoun = "PRIVATE"
	UserPronounHeHim    UserPronoun = "HE_HIM"
	UserPronounSheHer   UserPronoun = "SHE_HER"
	UserPronounTheyThem UserPronoun = "THEY_THEM"
)

var AllUserPronoun = []UserPronoun{
	UserPronounPrivate,
	UserPronounHeHim,
	UserPronounSheHer,
	UserPronounTheyThem,
}

func (e UserPronoun) Values() []string {
	values := make([]string, len(AllUserPronoun))
	for i := range AllUserPronoun {
		values[i] = AllUserPronoun[i].String()
	}
	return values
}

func (e UserPronoun) IsValid() bool {
	switch e {
	case UserPronounPrivate, UserPronounHeHim, UserPronounSheHer, UserPronounTheyThem:
		return true
	}
	return false
}

func (e UserPronoun) String() string {
	return string(e)
}

func (e *UserPronoun) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = UserPronoun(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid UserPronoun", str)
	}
	return nil
}

func (e UserPronoun) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
