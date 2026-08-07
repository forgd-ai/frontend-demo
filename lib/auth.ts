import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { authSecret } from "@/config/auth"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  secret: authSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Workshop",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase()
        if (!email) {
          return null
        }
        return db.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: email.split("@")[0],
          },
        })
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
