import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: { signIn: '/login' },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
