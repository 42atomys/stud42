package duoapi

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

type Location[UserType ILocationUser] struct {
	ID       int          `json:"id"`
	BeginAt  DuoTime      `json:"begin_at"`
	EndAt    *DuoTime     `json:"end_at"`
	Primary  bool         `json:"primary"`
	Host     string       `json:"host"`
	CampusID int          `json:"campus_id"`
	User     UserType `json:"user"`
}

type ILocationUser interface {
	LocationUser | ComplexLocationUser
}

type LocationUser struct {
	ID    int    `json:"id"`
	Login string `json:"login"`
	URL   string `json:"url"`
}

type ComplexLocationUser struct {
	ID    int    `json:"id"`
	Login string `json:"login"`
	URL   string `json:"url"`
	Email           string  `json:"email"`
	FirstName       string  `json:"first_name"`
	LastName        string  `json:"last_name"`
	UsualFullName   string  `json:"usual_full_name"`
	UsualFirstName  string  `json:"usual_first_name"`
	Phone           string  `json:"phone"`
	Displayname     string  `json:"displayname"`
	ImageURL        string  `json:"image_url"`
	NewImageURL     string  `json:"new_image_url"`
	Staff           bool    `json:"staff?"`
	CorrectionPoint int     `json:"correction_point"`
	PoolMonth       string  `json:"pool_month"`
	PoolYear        string  `json:"pool_year"`
	Location        string  `json:"location"`
	Wallet          int     `json:"wallet"`
	AnonymizeDate   DuoTime `json:"anonymize_date"`
	CreatedAt       DuoTime `json:"created_at"`
	UpdatedAt       DuoTime `json:"updated_at"`
	Alumni          bool    `json:"alumni"`
	IsLaunched      bool    `json:"is_launched?"`
}

type User struct {
	ID             int    `json:"id"`
	Email          string `json:"email"`
	Login          string `json:"login"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	UsualFullName  string `json:"usual_full_name"`
	UsualFirstName string `json:"usual_first_name"`
	URL            string `json:"url"`
	Staff          bool   `json:"staff?"`
	Phone 				string `json:"phone"`
	PoolMonth			string `json:"pool_month"`
	PoolYear			string `json:"pool_year"`
}
