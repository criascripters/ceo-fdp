import oauth from "./oauth";

export async function getDiscordToken(code: string) {
  try {
    const token = oauth
      .tokenRequest({
        code: code,
        scope: "identify guilds",
        grantType: "authorization_code",
      })
      .then((res) => res);

    return token;
  } catch (err) {
    console.error("[OAuth ERROR]", err);
    return { error: err };
  }
}
