import { APIUser as DiscordUser } from "discord-api-types/v10";
import Admins from "../../models/Admins";
import { getDiscordUserInfo } from "../../utils/getDiscordUserInfo";

/**
 * Determines whether a user is an admin based on their Discord ID and username.
 */
export default class IsAdminService {
  /**
   * Executes the service.
   *
   * @param discordUser The Discord user to verify. Can be either the Discord object or the access token ID.
   * @returns Whether the user is an admin. Returns `null` if the user is not found.
   */
  async execute(discordUser: DiscordUser | string): Promise<boolean | null> {
    let dataToVerify: DiscordUser | null = null

    if (typeof discordUser === "string") {
      try {
        dataToVerify = await getDiscordUserInfo(discordUser)
      } catch (error) {
        return null
      }
    }

    if (!dataToVerify) return false

    const admins = await Admins.findOne({})
    return !!(admins?.ids.includes(dataToVerify.id) || admins?.usernames.includes(dataToVerify.username))
  }
}