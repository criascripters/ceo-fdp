export async function getDiscordToken(code: string) {
  const params = new URLSearchParams();
  params.append("client_id", process.env.DISCORD_CLIENT_ID!);
  params.append("client_secret", process.env.DISCORD_CLIENT_SECRET!);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://po.criascript.dev");
  params.append("scope", "identify email");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    console.log(tokenData.error_description || "Erro ao obter token do Discord");
    return tokenData.error_description;
  }

  return tokenData.access_token;
}
