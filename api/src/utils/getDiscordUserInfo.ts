import oauth from "./oauth";

export async function getDiscordUserInfo(accessToken: string): Promise<any> {
  const res = await oauth.getUser(accessToken);

  return res;
}
