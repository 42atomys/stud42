package discord

import (
	"context"
)

// InviteOnOurDiscord invites a user to the S42 server using the Discord API.
// the discord guild id can be set in the environment variable DISCORD_GUILD_ID.
func (c *Client) InviteOnOurDiscord(ctx context.Context, token, userID string) error {
	return c.GuildMemberAdd(token, DefaultGuildID(), userID, "", []string{}, false, false)
}
