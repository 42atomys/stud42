package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type FollowsGroupKind string

const (
	FollowsGroupKindDynamic FollowsGroupKind = "DYNAMIC"
	FollowsGroupKindManual  FollowsGroupKind = "MANUAL"
)

var AllFollowsGroupKind = []FollowsGroupKind{
	FollowsGroupKindDynamic,
	FollowsGroupKindManual,
}

func (e FollowsGroupKind) Values() []string {
	values := make([]string, len(AllFollowsGroupKind))
	for i := range AllFollowsGroupKind {
		values[i] = AllFollowsGroupKind[i].String()
	}
	return values
}

func (e FollowsGroupKind) IsValid() bool {
	switch e {
	case FollowsGroupKindDynamic, FollowsGroupKindManual:
		return true
	}
	return false
}

func (e FollowsGroupKind) String() string {
	return string(e)
}

func (e *FollowsGroupKind) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = FollowsGroupKind(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid FollowsGroupKind", str)
	}
	return nil
}

func (e FollowsGroupKind) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
