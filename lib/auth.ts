import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, token }) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Код подтверждения регистрации",
        html: `<h1>Ваш код: ${token}</h1>`,
      });
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Код подтверждения",
          html: `<h1>Ваш код: ${otp}</h1>`,
        });
      },
    }),
  ],
});