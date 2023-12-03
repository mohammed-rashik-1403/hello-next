import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CognitoProvider from 'next-auth/providers/cognito';

/*
Counsellor SSO login config file
NextAuth with AzureADProvider
*/
export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: `241g55s6j05sqhc60pfv57if7t`,
      clientSecret: null,
      issuer: `https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_JtDXYUi6b`,
     // idToken: true,
      client: {
        token_endpoint_auth_method: "none"
      },
        checks: ["nonce","session-token"],
     
    
    }),
    AzureADProvider({
      clientId: `655d42ce-169d-45ed-88e0-7f23ac4ca837`,
      clientSecret: `nda8Q~GUCaBdZsm_5avtQvhRWZx7d1yZmUNooaAh`,
      tenantId: `c0c7ad79-cf13-4f39-8eeb-a1829aa096a6`,
      checks: 'both',
      authorization: {
        params: { scope: 'openid email profile User.Read  offline_access' },
      },
      httpOptions: { timeout: 10000 },
    }),
    
  ],
  secret : "qJ8Zg4buf9bFLO2knTn40Tnqatfdm1BNVRQ0GFXCX6w=",
  callbacks: {
    async jwt({ token, user, account }) {
       console.log("tokeeeeeeeeeeeeeeeeee",token)
       console.log("tokeeeeeeaccounteeeeeeeeeeee",account)
       console.log("tokeeeeeeeusereeeeeeeeeee",user)
       return token;
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
      // if(account?.id_token) {
      //   const [header, payload, sig] = account.id_token.split('.')
      //   const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  
      //   token.roles = [...idToken.roles]
      // }
      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }
      // return token.data;
      return token;
    },
    async session({ session, token }) {
      console.log("async session",session)
      console.log("async session token",token)
      if (session) {
        session.user = token.user;
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  async redirect({ url, baseUrl }) {
    return url;
    return baseUrl;
    console.log("toppppppppppppppp",url)
    console.log("topppppppppbaseeeeeeee",baseUrl)
    url = `/india/student-essentials/?asm=true`;
    // baseUrl = ``
    console.log("newwwwurl",url)
    console.log("newwwbaseUrlwurl",baseUrl)
    return url.startsWith(baseUrl) ? url : baseUrl+'/india';
    // return `http://localhost:3005/india/student-essentials/?asm=true`;
    // Allows relative callback URLs
    if (url.startsWith("/")){
      console.log("first con22",`${baseUrl}${url}`)
      return `${baseUrl}${url}`
    } 
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl){
      console.log("second con222",`${baseUrl}${url}`)
      return url
    } else{
      console.log("lasttttttt")
      // return `http://localhost:3005/india/student-essentials/?asm=true`;
      return baseUrl
    }
    
    return `https://d3jsaq6594du80.cloudfront.net/india/student-essentials`;
  },
   
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: '.hello-next-lime-kappa.vercel.app'
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: "/",
        secure: true,
      },
    },
    nonce: {
      name: `next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  
 
};

export default NextAuth(authOptions);
