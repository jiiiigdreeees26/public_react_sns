import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
    };
    expires: string;
    jwt: {
        "name": string;
        "email": string;
        "picture": string;
        "sub": string;
        "accessToken": string;
        "iat": number;
        "exp": number;
        "jti": string;
    }
  }
}
