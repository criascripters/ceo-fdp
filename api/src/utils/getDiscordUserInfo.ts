export async function getDiscordUserInfo(accessToken: string) {
  const res = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar dados do usuário Discord");
  }

  return res.json();
}
