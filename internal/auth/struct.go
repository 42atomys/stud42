package auth

import "time"

// TokenRequest is the request sent to the token endpoint
type TokenRequest struct {
	// The ID of the user to generate a token for
	UserId string `json:"user_id"`
	// The validity of the token to generate in seconds
	Validity int64 `json:"validity"`
	// The payload to insert into the token
	Payload map[string]interface{} `json:"payload"`
}

// TokenResponse is the response returned by the token endpoint
type TokenResponse struct {
	// The generated token
	Token string `json:"token"`
	//	 The ID of the token
	TokenId string `json:"token_id"`
	// The date the token was generated
	IssuedAt time.Time `json:"issued_at"`
	// The date when the token will expire
	ExpiresAt time.Time `json:"expires_at"`
}
