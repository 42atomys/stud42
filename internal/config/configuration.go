package config

import (
	"github.com/spf13/viper"
)

var (
	currentConfig = &Configuration{}
)

func Load() error {
	err := viper.Unmarshal(&currentConfig)
	if err != nil {
		return err
	}
	return nil
}
