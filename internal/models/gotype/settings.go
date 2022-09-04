package gotype

type Settings struct {
	Theme                Theme                `json:"theme"`
	ClusterMapAvatarSize ClusterMapAvatarSize `json:"clusterMapAvatarSize"`
}

var (
	DefaultSettings = Settings{Theme: ThemeAuto, ClusterMapAvatarSize: ClusterMapAvatarSizeAuto}
)
