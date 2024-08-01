import NextAuth, { DefaultSession, DefaultJwt } from 'next-auth';

// Extend DefaultSession to include custom properties
declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      displayName: string;
      imageUrl: string;
    } & DefaultSession['user'];
  }

  interface Token extends DefaultJwt {
    _id: string;
    displayName: string;
    imageUrl: string;
  }
}
