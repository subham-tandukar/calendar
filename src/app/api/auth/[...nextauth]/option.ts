import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    TwitterProvider({
      clientId: process.env.NEXT_TWITTER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_TWITTER_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cookieToken = cookies().get('ok_reg_user')?.value;
        try {
          const requestBody = cookieToken
          ? { ok_reg_user: cookieToken }
          : { username: credentials?.username, password: credentials?.password };

          const endpoint = cookieToken
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/loginViaCookie`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login`;

          const res = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" }
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Authentication error:", errorResponse);
            return null;
          }

          const responseData = await res.json();
          if (responseData.error && responseData.error.message === "Invalid username or password") {
            return null;
          }
          console.log("Login successful", responseData);

          if (!cookieToken) {
            cookies().set("ok_reg_user", responseData.data.ok_cookie_token);
          }

          return { ...responseData }; 
        } catch (error) {
          console.error("Authentication error:", error);
          return null; 
        }
      },
    }),
  ],
  pages: {},
  callbacks: {
    async jwt({  token , user, account }) {
      if (user) {
        token.user = user; 
      }  
      let errorMsg = ""
      if (account && account.provider !== "credentials") {
        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
        try {
          let callbackUrl = "";
          let accountbody ;
          if (account.provider === "twitter") {
            callbackUrl = `${apiUrl}/api/v1/login/twitter/callback`;
            accountbody = JSON.stringify({ oauth_token:  account.oauth_token  , oauth_token_secret:account.oauth_token_secret})

          } else if (account.provider === "google") {
            callbackUrl = `${apiUrl}/api/v1/login/google/callback`;
            accountbody = JSON.stringify({ access_token: account.access_token  })

          }
          const res = await fetch(callbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },

            body: accountbody,

          }); 
          console.log("access token",account.access_token  )
          const responseFromBackend = await res.json();
          console.log("response from backend", responseFromBackend);
          
          if (res.ok) {
            console.log("Access token sent to backend successfully");
            token =  { ...token,  "token" : responseFromBackend.data.token };
            cookies().set("ok_reg_user", responseFromBackend.data.ok_cookie_token);
          } else {
            errorMsg = responseFromBackend.error.message
            token.error = responseFromBackend.error.message; // Add an error property to the token
            console.error('Failed to send access token to backend:', await res.text());
          }
        } catch (error) {
          token.error = errorMsg; // Add an error property to the token
          console.error('Error sending access token to backend:', error);
        }
      }

      return  token; 
    },
   
    async session({ session, token , user  }) {  
      if (token.error) {
        return { ...session, error: token.error }; // Pass the error to the session
      }
      return { ...session, ...token  , ...user };
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
