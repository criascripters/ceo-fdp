import oauth from './oauth'

export async function getDiscordUserInfo(accessToken: string) {
  const res = await oauth.getUser(accessToken)

  return res
}
