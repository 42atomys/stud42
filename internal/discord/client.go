package discord

import (
	"errors"
	"os"

	"github.com/bwmarrin/discordgo"
	"github.com/spf13/viper"
)

// Client is a wrapper around the discordgo.Session type.
// It is used to simplify the usage of the discordgo.Session type.
type Client struct {
	*discordgo.Session
}

// defaultClient is the global Discord client used by app who don't want to
// create their own client.
var defaultClient *Client

// defaultGuildID returns the Discord guild ID. It will automatically retrieve the
// guild ID from the environment variable DISCORD_GUILD_ID or from the config
// file. If no guild ID is set, it will return an error.
var defaultGuildID string

// ErrNoGuildID is the error returned when no guild ID is set.
var ErrNoGuildID = errors.New("no guild ID set under viper discord.guildID or env DISCORD_GUILD_ID")

// NewClient creates a new Discord client. It will automatically login to
// Discord using the Discord token specified in the environment variable
func NewClient() (*Client, error) {
	s, err := discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		return nil, err
	}

	return &Client{
		Session: s,
	}, nil
}

// SetDefaultClient sets the global Discord client used by app who don't want to
// create their own client.
func SetDefaultClient(c *Client) {
	defaultClient = c
}

// DefaultClient returns the global Discord client used by app who don't want to
// create their own client. If no client has been set, it will create a new one.
func DefaultClient() *Client {
	if defaultClient == nil {
		defaultClient, _ = NewClient()
	}
	return defaultClient
}

// retrieveGuildID returns the Discord guild ID. It will automatically retrieve the
// guild ID from the environment variable DISCORD_GUILD_ID or from the config
// file. If no guild ID is set, it will return an error.
func retrieveGuildID() string {
	defaultGuildID = os.Getenv("DISCORD_GUILD_ID")
	if defaultGuildID == "" {
		defaultGuildID = viper.GetString("discord.guildID")
	}

	if defaultGuildID == "" {
		panic(ErrNoGuildID)
	}
	return defaultGuildID
}

// DefaultGuildID returns the Discord guild ID. It can be used by app who don't want to
// use complex logic to retrieve the guild ID and only want to manage a single guild.
func DefaultGuildID() string {
	if defaultGuildID == "" {
		defaultGuildID = retrieveGuildID()
	}

	return defaultGuildID
}
