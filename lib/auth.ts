import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
import { twoFactor, magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: true
  },

  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      console.log("Verification link:");
      console.log(url);
    }
  },

  plugins: [
    twoFactor(),

    magicLink({
      async sendMagicLink({ url }) {
        console.log("Magic link:");
        console.log(url);
      }
    })
  ]
});