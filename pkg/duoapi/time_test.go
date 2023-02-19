package duoapi

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTimeUnmarshall(t *testing.T) {
	tests := []struct {
		name               string
		input              string
		expected           string
		expectedErr        bool
		expectedTimeIsZero bool
	}{
		{
			"DuoTime with timezone",
			"2018-09-26 14:00:00 UTC",
			"2018-09-26 14:00:00",
			false,
			false,
		},
		{
			"DuoTime in format RFC3339",
			"2018-09-26T14:00:00Z",
			"2018-09-26 14:00:00",
			false,
			false,
		},
		{
			"DuoTime in format RFC3339 with timezone",
			"2018-09-26T14:00:00+02:00",
			"2018-09-26 14:00:00",
			false,
			false,
		},
		{
			"DuoTime is null",
			"null",
			"0001-01-01 00:00:00",
			false,
			true,
		},
		{
			"DuoTime is empty",
			"",
			"0001-01-01 00:00:00",
			true,
			false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var dt DuoTime
			if test.expectedErr {
				assert.Error(t, dt.UnmarshalJSON([]byte(test.input)))
				assert.True(t, dt.Time().IsZero())
				return
			} else {
				assert.NoError(t, dt.UnmarshalJSON([]byte(test.input)))
			}

			assert.Equal(t, test.expectedTimeIsZero, dt.Time().IsZero())
			assert.Equal(t, test.expected, dt.Format("2006-01-02 15:04:05"))
		})
	}
}

func TestTimeMarshall(t *testing.T) {
	tests := []struct {
		name               string
		input              DuoTime
		expectedMarshal    string
		expectedStringFunc string
		expectedTimeIsZero bool
	}{
		{
			"DuoTime with timezone",
			DuoTime(time.Date(2018, 9, 26, 14, 0, 0, 0, time.UTC)),
			"\"2018-09-26T14:00:00Z\"",
			"2018-09-26T14:00:00Z",
			false,
		},
		{
			"DuoTime in format RFC3339",
			DuoTime(time.Date(2018, 9, 26, 14, 0, 0, 0, time.UTC)),
			"\"2018-09-26T14:00:00Z\"",
			"2018-09-26T14:00:00Z",
			false,
		},
		{
			"DuoTime in format RFC3339 with timezone",
			DuoTime(time.Date(2018, 9, 26, 14, 0, 0, 0, time.FixedZone("UTC+2", 2*60*60))),
			"\"2018-09-26T14:00:00+02:00\"",
			"2018-09-26T14:00:00+02:00",
			false,
		},
		{
			"DuoTime is zero",
			DuoTime(time.Time{}),
			"null",
			"",
			true,
		},
		{
			"DuoTime is empty",
			DuoTime{},
			"null",
			"",
			true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			assert.Equal(t, test.expectedTimeIsZero, test.input.Time().IsZero())
			b, err := test.input.MarshalJSON()
			assert.NoError(t, err)
			assert.Equal(t, test.expectedMarshal, string(b))
			assert.Equal(t, test.expectedStringFunc, test.input.String())
		})
	}
}

func TestNillableTime(t *testing.T) {
	tests := []struct {
		name        string
		input       *DuoTime
		expectedNil bool
	}{
		{
			"DuoTime is nil",
			nil,
			true,
		},
		{
			"DuoTime is not nil but empty",
			&DuoTime{},
			true,
		},
		{
			"DuoTime is not nil and not empty",
			func() *DuoTime {
				dt := DuoTime(time.Now())
				return &dt
			}(),
			false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			assert.Equal(t, test.expectedNil, test.input.NillableTime() == nil)
		})
	}
}
