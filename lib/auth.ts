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

  plugins: [
    twoFactor(),
    magicLink({
      async sendMagicLink({ url }) {
        console.log("Magic link / Verification link:");
        console.log(url);
      }
    })
  ]
});