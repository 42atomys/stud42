package gotype

type Settings struct {
	Theme Theme `json:"theme"`
}

type Theme string

const (
	ThemeDark  Theme = "DARK"
	ThemeLight Theme = "LIGHT"
	ThemeAuto  Theme = "AUTO"
)

var (
	DefaultSettings = Settings{Theme: ThemeAuto}
)
