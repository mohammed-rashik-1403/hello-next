import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import GitHubProvider from 'next-auth/providers/github';

const env = process.env;

async function refreshAccessToken(token) {
  try {
  
     const url = "https://login.microsoftonline.com/c0c7ad79-cf13-4f39-8eeb-a1829aa096a6/oauth2/token"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token`
      + `&client_secret=o3e8Q~VUhdOvQmgqXsiAcU7C~PGH-RRSY7Cl8bg~`
      + `&refresh_token=0.AWYAea3HwBPPOU-O66GCmqCWpvRj5Yf3wyJNlnu6LloBqpJmAPk.AgABAAEAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P--g9Zko-gTTfgWKOM23FdCAAvWSnQfgBw7pE1UhjZRaWvC77M4ZkrvjbH_NTkB_Jb7zKvHFXVeBtlwkGpAjlaFM_nnt8-ShV-q1DLRAZogk6IFWWYU13E3p-c4E52u4zFUnJGsOMpKcfS-bbgiSCIhGk1diB0SFUcX8nTevZ985QUGU-8mrbCyex-UJThl0Ts64SCWP_kwDX2HygGxpDEKMaxhzd2XZ1B8HnyQ9sVsJHHu04rbgu0zGqeuIqQ6XcJ31i3y2mJytqRETPKGznXYl9fdATJNJDJi1Qsjp6t0uhyaIIzeW-r1RbXCImGc-irAvJfw-0n9siRDDqVJyFs1NBeV6C7cK9kj46Pg-5qQ4W3nVYk2oNXeU1pL5bOorfTjDrCPFp-gjGI43FTfe0vzoUgZaGFXuphnZtmQmEiSR66ROdz8WRHmHrem9q1tj4pkTT287nDD4BSLKId0esQqutEptvmKBRF34TY5y2GlJ-_u5uD2c84McZQH8dTFHYf4RqKv-9gF2r98ailSk7UxPfbczlQfD01weWUsMk4Bp0gBjWhCVF92BXWrmC8QhocWezGga0-c5hudx2QNKL65tbOd-b4CD8ytaHucBbr8goL-mJejHhPNJyU_ZGcjPrYCX-Lym52Uf6ie9inkmOGkU7WuljtIXeSMcnuatbHfR77KBcPWNydKygF8OdwjMAlKmKO6Rzz2VbY0lmj2NbPbLrf_iev8W1nqLVdavIKDroAMF9qC6-NqngUKTUlktJj5ImmC3Smwert85yXqXVP1hk2rC078QQHPbP1U2I018EYtdjwNf6FzFsJvD8OlN5A3UV6W4XPxYUvo5nxW06AUCqZCsSblMzAbfmcqbY2UXP-yFTO_dzvIsXUXitV-bHy_fw`
      + `&client_id=87e563f4-c3f7-4d22-967b-ba2e5a01aa92`
    })
    const refreshedTokens = await response.json()
  
    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}



export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: '6740bcd8b840387e2ac3',
      clientSecret: 'e2e4c200a0e06232cee7343d3bc443288846da9c',
    }),
    AzureADProvider({
      clientId: `87e563f4-c3f7-4d22-967b-ba2e5a01aa92`,
      clientSecret: `o3e8Q~VUhdOvQmgqXsiAcU7C~PGH-RRSY7Cl8bg~`,
      tenantId: `c0c7ad79-cf13-4f39-8eeb-a1829aa096a6`,
      authorization: {
        params: { scope: 'openid email profile User.Read  offline_access' },
      },
    //   profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
    //   profile: (profile) => {
    //     console.log('THE PROFIdddLE....................................................', profile)
    //   },
      httpOptions: { timeout: 10000 },
    }),
    
  ],
  secret : "QXmdh/3Y85F80suN0ukW72ll/K5tv7Ey8eky3DJJ5pM=",
 
  callbacks: {
    
    async jwt({ token, user, account }) {
      
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }
      console.log("+++++++++++++++++++++++++")
      console.log(user)
      if(account?.id_token) {
        const [header, payload, sig] = account.id_token.split('.')
        const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  
        token.roles = [...idToken.roles]
      }
      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }
      return token
      console.log("account,calbback",Date.now())
      return refreshAccessToken(token)
    },
   
  
    async session({ session, token }) {
      console.log("newwwwww",token)
      if (session) {
        session.user = token.user;
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);