import { APIUser } from 'discord-api-types/v10';
import oauth from "./oauth";

export async function getDiscordUserInfo(accessToken: string): Promise<APIUser> {
  const res = await oauth.getUser(accessToken);

  return res;
}
