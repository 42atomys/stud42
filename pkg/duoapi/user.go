package duoapi

import (
	"context"
)

func UserGet(ctx context.Context, userID string) (*User, error) {
	var user = &User{}
	err := request(ctx, EndpointUsers+"/"+userID, nil, &user)
	if err != nil {
		return nil, err
	}
	return user, nil
}
