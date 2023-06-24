package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type NoticeColor string

const (
	NoticeColorInfo    NoticeColor = "INFO"
	NoticeColorSuccess NoticeColor = "SUCCESS"
	NoticeColorWarning NoticeColor = "WARNING"
	NoticeColorDanger  NoticeColor = "DANGER"
	NoticeColorBlack   NoticeColor = "BLACK"
)

var AllNoticeColor = []NoticeColor{
	NoticeColorInfo,
	NoticeColorSuccess,
	NoticeColorWarning,
	NoticeColorDanger,
	NoticeColorBlack,
}

func (e NoticeColor) Values() []string {
	values := make([]string, len(AllNoticeColor))
	for i := range AllNoticeColor {
		values[i] = AllNoticeColor[i].String()
	}
	return values
}

func (e NoticeColor) IsValid() bool {
	switch e {
	case NoticeColorInfo, NoticeColorSuccess, NoticeColorWarning, NoticeColorDanger, NoticeColorBlack:
		return true
	}
	return false
}

func (e NoticeColor) String() string {
	return string(e)
}

func (e *NoticeColor) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = NoticeColor(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid NoticeColor", str)
	}
	return nil
}

func (e NoticeColor) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
