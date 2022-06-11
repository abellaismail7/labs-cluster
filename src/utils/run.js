import { ClientCredentials } from "simple-oauth2";

const config = {
  client: {
    id: process.env.CLIENT_UID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://api.intra.42.fr",
  },
};

global.accessToken = null

export async function run() {

  const accessToken = global.accessToken;
	if (accessToken)
  		console.log(accessToken, Date.parse(accessToken.token.expires_at), Date.now())
  if (accessToken && Date.parse(accessToken.token.expires_at) > Date.now())
  {
    console.log("fromCache####################", )
    return accessToken.token;
  }
	
  const client = new ClientCredentials(config);

  try {
    // get access token
    const accessToken = await client.getToken();
	global.accessToken = accessToken;

    // return access token
    return accessToken.token;
  } catch (error) {
    console.log("Access Token error", error.message);
    return null;
  }
}

export function now() {
	return Date.now() / 1000;
}

