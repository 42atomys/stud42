package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type Theme string

const (
	ThemeAuto  Theme = "AUTO"
	ThemeDark  Theme = "DARK"
	ThemeLight Theme = "LIGHT"
)

var AllTheme = []Theme{
	ThemeAuto,
	ThemeDark,
	ThemeLight,
}

func (e Theme) IsValid() bool {
	switch e {
	case ThemeAuto, ThemeDark, ThemeLight:
		return true
	}
	return false
}

func (e Theme) String() string {
	return string(e)
}

func (e *Theme) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Theme(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid THEME", str)
	}
	return nil
}

func (e Theme) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
