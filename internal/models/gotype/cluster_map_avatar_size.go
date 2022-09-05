package gotype

import (
	"fmt"
	"io"
	"strconv"
)

type ClusterMapAvatarSize string

const (
	ClusterMapAvatarSizeAuto   ClusterMapAvatarSize = "AUTO"
	ClusterMapAvatarSizeMedium ClusterMapAvatarSize = "MEDIUM"
	ClusterMapAvatarSizeLarge  ClusterMapAvatarSize = "LARGE"
)

var AllClusterMapAvatarSize = []ClusterMapAvatarSize{
	ClusterMapAvatarSizeAuto,
	ClusterMapAvatarSizeMedium,
	ClusterMapAvatarSizeLarge,
}

func (e ClusterMapAvatarSize) IsValid() bool {
	switch e {
	case ClusterMapAvatarSizeAuto, ClusterMapAvatarSizeMedium, ClusterMapAvatarSizeLarge:
		return true
	}
	return false
}

func (e ClusterMapAvatarSize) String() string {
	return string(e)
}

func (e *ClusterMapAvatarSize) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClusterMapAvatarSize(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClusterMapAvatarSize", str)
	}
	return nil
}

func (e ClusterMapAvatarSize) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
