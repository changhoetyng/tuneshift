export default async function retrieveTokenWithCode(
  spotifyCodeVerifier: string,
  spotifyCode: string,
  redirectUri: string,
  spotifyAPIKey: string
) {
  const clientId = spotifyAPIKey;

  if (!clientId) {
    throw new Error("Spotify client ID not found");
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: spotifyCode,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_CURRENT_URL}/spotify-authentication-redirection?redirect_link=${redirectUri}`,
      code_verifier: spotifyCodeVerifier,
    }),
  };

  const body = await fetch("https://accounts.spotify.com/api/token", payload);
  const response = await body.json();

  return response;
}
