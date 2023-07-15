package duoapi

type HeaderLink map[string]string

type Achievement struct {
	ID           int         `json:"id"`
	Name         string      `json:"name"`
	Description  string      `json:"description"`
	Tier         string      `json:"tier"`
	Kind         string      `json:"kind"`
	Visible      bool        `json:"visible"`
	Image        string      `json:"image"`
	NbrOfSuccess interface{} `json:"nbr_of_success"`
	UsersURL     string      `json:"users_url"`
}

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
	Public             bool        `json:"public"`
	EmailExtension     string      `json:"email_extension"`
	DefaultHiddenPhone bool        `json:"default_hidden_phone"`
	Endpoint           interface{} `json:"endpoint"`
}

type CampusUser struct {
	ID        int     `json:"id"`
	UserID    int     `json:"user_id"`
	CampusUD  int     `json:"campus_id"`
	IsPrimary bool    `json:"is_primary"`
	CreatedAt DuoTime `json:"created_at"`
	UpdatedAt DuoTime `json:"updated_at"`
}

type Cursus struct {
	ID        int     `json:"id"`
	Kind      string  `json:"kind"`
	Name      string  `json:"name"`
	Slug      string  `json:"slug"`
	CreatedAt DuoTime `json:"created_at"`
}

type CursusUser struct {
	Grade        string  `json:"grade"`
	Level        float64 `json:"level"`
	Skills       []Skill `json:"skills"`
	BlackholedAt DuoTime `json:"blackholed_at"`
	ID           int     `json:"id"`
	BeginAt      DuoTime `json:"begin_at"`
	EndAt        DuoTime `json:"end_at"`
	CursusID     int     `json:"cursus_id"`
	HasCoalition bool    `json:"has_coalition"`
	CreatedAt    DuoTime `json:"created_at"`
	UpdatedAt    DuoTime `json:"updated_at"`
	User         User    `json:"user"`
	Cursus       Cursus  `json:"cursus"`
}

type ExpertisesUser struct {
	ID          int     `json:"id"`
	UserID      int     `json:"user_id"`
	ExpertiseID int     `json:"expertise_id"`
	Interested  bool    `json:"interested"`
	Value       int     `json:"value"`
	ContactMe   bool    `json:"contact_me"`
	CreatedAt   DuoTime `json:"created_at"`
}

type Group struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Image struct {
	Link     string `json:"link"`
	Versions struct {
		Large  string `json:"large"`
		Medium string `json:"medium"`
		Small  string `json:"small"`
		Micro  string `json:"micro"`
	} `json:"versions"`
}

type Language struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	Identifier string  `json:"identifier"`
	CreatedAt  DuoTime `json:"created_at"`
	UpdatedAt  DuoTime `json:"updated_at"`
}

type LanguagesUser struct {
	ID         int     `json:"id"`
	LanguageID int     `json:"language_id"`
	UserID     int     `json:"user_id"`
	Position   int     `json:"position"`
	CreatedAt  DuoTime `json:"created_at"`
}

type Location[UserType ILocationUser] struct {
	ID       int      `json:"id"`
	BeginAt  DuoTime  `json:"begin_at"`
	EndAt    *DuoTime `json:"end_at"`
	Primary  bool     `json:"primary"`
	Host     string   `json:"host"`
	CampusID int      `json:"campus_id"`
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
	ID              int     `json:"id"`
	Login           string  `json:"login"`
	URL             string  `json:"url"`
	Email           string  `json:"email"`
	FirstName       string  `json:"first_name"`
	LastName        string  `json:"last_name"`
	UsualFullName   string  `json:"usual_full_name"`
	UsualFirstName  string  `json:"usual_first_name"`
	Phone           string  `json:"phone"`
	Displayname     string  `json:"displayname"`
	Image           Image   `json:"image"`
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

type Project struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Slug     string `json:"slug"`
	ParentID int    `json:"parent_id"`
}

type ProjectsUser struct {
	ID            int     `json:"id"`
	Occurrence    int     `json:"occurrence"`
	FinalMark     int     `json:"final_mark"`
	Status        string  `json:"status"`
	Validated     bool    `json:"validated?"`
	CurrentTeamID int     `json:"current_team_id"`
	Project       Project `json:"project"`
	CursusIds     []int   `json:"cursus_ids"`
	MarkedAt      DuoTime `json:"marked_at"`
	Marked        bool    `json:"marked"`
	RetriableAt   DuoTime `json:"retriable_at"`
	CreatedAt     DuoTime `json:"created_at"`
	UpdatedAt     DuoTime `json:"updated_at"`
}

type Skill struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Level float64 `json:"level"`
}

type Title struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type TitlesUser struct {
	ID        int     `json:"id"`
	UserID    int     `json:"user_id"`
	TitleID   int     `json:"title_id"`
	Selected  bool    `json:"selected"`
	CreatedAt DuoTime `json:"created_at"`
	UpdatedAt DuoTime `json:"updated_at"`
}

type User struct {
	ID              int              `json:"id"`
	Email           string           `json:"email"`
	Login           string           `json:"login"`
	FirstName       string           `json:"first_name"`
	LastName        string           `json:"last_name"`
	UsualFullName   string           `json:"usual_full_name"`
	UsualFirstName  string           `json:"usual_first_name"`
	URL             string           `json:"url"`
	Phone           string           `json:"phone"`
	Displayname     string           `json:"displayname"`
	Kind            string           `json:"kind"`
	Image           Image            `json:"image"`
	Staff           bool             `json:"staff?"`
	CorrectionPoint int              `json:"correction_point"`
	PoolMonth       string           `json:"pool_month"`
	PoolYear        string           `json:"pool_year"`
	Location        string           `json:"location"`
	Wallet          int              `json:"wallet"`
	AnonymizeDate   DuoTime          `json:"anonymize_date"`
	DataErasureDate DuoTime          `json:"data_erasure_date"`
	CreatedAt       DuoTime          `json:"created_at"`
	UpdatedAt       DuoTime          `json:"updated_at"`
	AlumnizedAt     *DuoTime         `json:"alumnized_at"`
	Alumni          bool             `json:"alumni?"`
	Active          bool             `json:"active?"`
	Groups          []Group          `json:"groups"`
	CursusUsers     []CursusUser     `json:"cursus_users"`
	ProjectsUsers   []ProjectsUser   `json:"projects_users"`
	LanguagesUsers  []LanguagesUser  `json:"languages_users"`
	Achievements    []Achievement    `json:"achievements"`
	Titles          []Title          `json:"titles"`
	TitlesUsers     []TitlesUser     `json:"titles_users"`
	ExpertisesUsers []ExpertisesUser `json:"expertises_users"`
	Campus          []Campus         `json:"campus"`
	CampusUsers     []CampusUser     `json:"campus_users"`
	// Partnerships    []interface{} `json:"partnerships"`
	// Patroned        []interface{} `json:"patroned"`
	// Patroning       []interface{} `json:"patroning"`
	// Roles  []interface{} `json:"roles"`
}
