import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcryptjs");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email dan password harus diisi");
        }

        try {
          const res = await fetch("http://localhost:9001/users");
          const users: { email: string; password: string; role: string; user_id: number; name: string }[] = await res.json();

          const user = users.find((u) => u.email === credentials.email);

          if (!user || user.role !== "admin") {
            throw new Error("Akun tidak memiliki akses admin");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Password salah");
          }

          return {
            id: user.user_id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Login Error:", error);
          throw new Error("Login gagal, periksa kembali kredensial Anda");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
