package duoapi

import "time"

type HeaderLink map[string]string

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
	ID              int       `json:"id"`
	Email           string    `json:"email"`
	Login           string    `json:"login"`
	FirstName       string    `json:"first_name"`
	LastName        string    `json:"last_name"`
	UsualFullName   string    `json:"usual_full_name"`
	UsualFirstName  string    `json:"usual_first_name"`
	URL             string    `json:"url"`
	Phone           string    `json:"phone"`
	Displayname     string    `json:"displayname"`
	ImageURL        string    `json:"image_url"`
	NewImageURL     string    `json:"new_image_url"`
	Staff           bool      `json:"staff?"`
	CorrectionPoint int       `json:"correction_point"`
	PoolMonth       string    `json:"pool_month"`
	PoolYear        string    `json:"pool_year"`
	Location        string    `json:"location"`
	Wallet          int       `json:"wallet"`
	AnonymizeDate   time.Time `json:"anonymize_date"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	Alumni          bool      `json:"alumni"`
	IsLaunched      bool      `json:"is_launched?"`
}
