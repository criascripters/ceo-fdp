import DiscordOauth2 from 'discord-oauth2'
import { settings } from '../utils/settings'

const oauth = new DiscordOauth2({
  clientId: settings.discordClientId,
  clientSecret: settings.discordClientSecret,
  redirectUri: settings.redirectUri,
})
export default oauth
