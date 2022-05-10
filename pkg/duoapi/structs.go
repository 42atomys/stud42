package duoapi

import "time"

type Campus struct {
	ID                 int         `json:"id"`
	Name               string      `json:"name"`
	TimeZone           string      `json:"time_zone"`
	Language           Language    `json:"language"`
	UsersCount         int         `json:"users_count"`
	VogsphereID        int         `json:"vogsphere_id"`
	Country            string      `json:"country"`
	Address            string      `json:"address"`
	Zip                string      `json:"zip"`
	City               string      `json:"city"`
	Website            string      `json:"website"`
	Facebook           string      `json:"facebook"`
	Twitter            string      `json:"twitter"`
	Active             bool        `json:"active"`
	EmailExtension     string      `json:"email_extension"`
	DefaultHiddenPhone bool        `json:"default_hidden_phone"`
	Endpoint           interface{} `json:"endpoint"`
}

type Language struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Identifier string `json:"identifier"`
}

type Location struct {
	ID       int          `json:"id"`
	BeginAt  time.Time    `json:"begin_at"`
	EndAt    *time.Time   `json:"end_at"`
	Primary  bool         `json:"primary"`
	Host     string       `json:"host"`
	CampusID int          `json:"campus_id"`
	User     LocationUser `json:"user"`
}

type LocationUser struct {
	ID    int    `json:"id"`
	Login string `json:"login"`
	URL   string `json:"url"`
}
