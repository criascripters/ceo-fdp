import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10'
import oauth from './oauth'

export async function getDiscordToken(code: string): Promise<RESTPostOAuth2AccessTokenResult> {
  try {
    return await oauth.tokenRequest({
      code: code,
      scope: 'identify guilds',
      grantType: 'authorization_code',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro ao obter token do Discord'
    console.error(`[ERROR] ${message}`)
    throw new Error(message)
  }
}
