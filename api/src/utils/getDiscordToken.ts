import { settings } from "./settings";

export async function getDiscordToken(code: string) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", settings.redirectUri);
  params.append("client_id", settings.discordClientId);
  params.append("client_secret", settings.discordClientSecret);

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    credentials: "include",
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    console.error(`[ERROR] ${tokenData.error_description || "Erro ao obter token do Discord"}`);
  }

  return tokenData;
}
