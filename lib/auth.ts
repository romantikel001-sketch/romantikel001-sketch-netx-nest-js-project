import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
import { twoFactor, magicLink } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: true
  },

  // ВОТ ЭТОГО НЕ ХВАТАЛО ДЛЯ РЕГИСТРАЦИИ:
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Подтверждение почты",
        html: `<p>Нажмите <a href="${url}">здесь</a>, чтобы подтвердить ваш аккаунт.</p>`,
      });
    },
  },

  plugins: [
    twoFactor(),
    magicLink({
      async sendMagicLink({ email, url }) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Вход по ссылке",
          html: `<p>Нажмите <a href="${url}">здесь</a>, чтобы войти в систему.</p>`,
        });
      }
    })
  ]
});