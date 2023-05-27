package s3

import (
	"fmt"
	"regexp"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/spf13/viper"
)

type S3Client struct {
	cfg *viper.Viper
	*s3.S3
}

// BucketConfigKey is a type for bucket config keys
// that are used to get bucket config from viper
// config file. This is not the bucket name itself.
type BucketConfigKey string

const (
	// UsersBucketConfigKey is a bucket config key for users bucket
	// This is not the bucket name itself.
	UsersBucketConfigKey BucketConfigKey = "users"
)

// NewS3Client creates a new S3 client with the given bucket config key.
func NewS3Client(bucketConfigKey BucketConfigKey) (*S3Client, error) {
	cfg := viper.Sub("api.s3." + string(UsersBucketConfigKey))
	s, err := session.NewSession(aws.NewConfig().
		WithEndpoint(cfg.GetString("endpoint")).
		WithRegion(cfg.GetString("region")).
		WithCredentials(credentials.NewCredentials(&credentials.EnvProvider{})),
	)
	if err != nil {
		return nil, err
	}

	return &S3Client{
		cfg: cfg,
		S3: s3.New(
			s,
			aws.NewConfig().
				WithS3ForcePathStyle(cfg.GetBool("forcePathStyle")),
		),
	}, nil
}

// PresignedUploadURL returns a presigned upload URL for the given key.
// The URL will expire after the given expiration duration. The URL will
// be valid for the given content type and content length and will be
// uploaded with the given ACL.
func (c *S3Client) PresignedUploadURL(key, contentType string, contentLength int64, acl string, expiration time.Duration) (string, error) {
	request, _ := c.PutObjectRequest(&s3.PutObjectInput{
		Bucket:        aws.String(c.cfg.GetString("bucket")),
		Key:           aws.String(key),
		ContentType:   aws.String(contentType),
		ContentLength: aws.Int64(contentLength),
		ACL:           aws.String(acl),
	})

	return request.Presign(expiration)
}

// GetBucket returns the bucket name from the config.
func (c *S3Client) GetBucket() string {
	return c.cfg.GetString("bucket")
}

// GetBaseURL returns the base URL for the bucket. This is used to
// construct the full URL of the bucket based if the bucket is not
// configured to use path style URLs. If the bucket is configured to
// use path style URLs, the base URL will be the same as the endpoint.
func (c *S3Client) GetBaseURL() string {
	s3Endpoint := c.cfg.GetString("endpoint")
	if !c.cfg.GetBool("forcePathStyle") {
		s3Endpoint = regexp.MustCompile(`://`).ReplaceAllString(
			s3Endpoint,
			fmt.Sprintf("://%s.", c.cfg.GetString("bucket")),
		)
	}

	return s3Endpoint
}
