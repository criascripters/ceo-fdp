import dotenv from "dotenv";
import { IEnvironment, isEnvironment } from "../@types/environment";

dotenv.config();

/**
 * Gets the redirect URI based on the environment.
 */
function getRedirectUri(env: IEnvironment) {
    if (env === "prod") return "https://po.criascript.dev"
    return "http://localhost:5173"
}

const env = isEnvironment(process.env.NODE_ENV) ? process.env.NODE_ENV : "dev"
const redirectUri = getRedirectUri(env)
const discordClientId = process.env.DISCORD_CLIENT_ID ?? ""
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET ?? ""
const databaseUrl = process.env.DATABASE_URL ?? "mongodb://localhost:27017/ceofdp"
const apiSecret = process.env.API_SECRET ?? "po-arrombado-api-secret-12345"

/**
 * API global settings.
 */
export const settings = {
    env,
    databaseUrl,
    discordClientId,
    discordClientSecret,
    redirectUri,
    apiSecret,
}
