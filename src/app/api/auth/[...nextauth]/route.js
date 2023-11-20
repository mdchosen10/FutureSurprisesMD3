import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
    }),
  ],
  session: {
    // Use JSON Web Token (JWT) for secure sessions
    strategy: 'jwt',
  },
  pages: {
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Store the received Google token in browser local storage
      localStorage.setItem('googleToken', token.accessToken);

      // Return the updated session with the stored token
      return { ...session, googleToken: token.accessToken };
    },
  },
});

export { handler as GET, handler as POST };