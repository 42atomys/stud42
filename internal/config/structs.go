package config

type Configuration struct {
	API       *APIConfiguration       `mapstructure:"api"`
	Interface *InterfaceConfiguration `mapstructure:"interface"`
}

type APIConfiguration struct{}

type InterfaceConfiguration struct{}
