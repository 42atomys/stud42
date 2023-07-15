package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type AccountType string

const (
	AccountTypeOauth AccountType = "OAUTH"
)

var AllAccountType = []AccountType{
	AccountTypeOauth,
}

func (e AccountType) Values() []string {
	values := make([]string, len(AllAccountType))
	for i := range AllAccountType {
		values[i] = AllAccountType[i].String()
	}
	return values
}

func (e AccountType) IsValid() bool {
	switch e {
	case AccountTypeOauth:
		return true
	}
	return false
}

func (e AccountType) String() string {
	return string(e)
}

func (e *AccountType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountType", str)
	}
	return nil
}

func (e AccountType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
