package duoapi

import (
	"encoding/json"
	"strings"
	"time"
)

type DuoTime time.Time

const duoTimeFormat = "2006-01-02 15:04:05 MST"

func (dt *DuoTime) UnmarshalJSON(b []byte) error {
	s := strings.Trim(string(b), "\"")
	t, err := time.Parse(duoTimeFormat, s)
	if err != nil {
		t2, err := time.Parse(time.RFC3339, s)
		if err != nil {
			return err
		}
		t = t2
	}
	*dt = DuoTime(t)
	return nil
}

func (dt DuoTime) MarshalJSON() ([]byte, error) {
	return json.Marshal(dt.Time())
}

func (dt DuoTime) Time() time.Time {
	return time.Time(dt)
}

func (dt *DuoTime) NillableTime() *time.Time {
	if dt == nil {
		return nil
	}

	nt := dt.Time()
	return &nt
}

func (dt DuoTime) Format(s string) string {
	return dt.Time().Format(s)
}

func (dt DuoTime) String() string {
	return dt.Time().String()
}
