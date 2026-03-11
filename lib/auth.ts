import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
<<<<<<< HEAD
import { twoFactor, magicLink } from "better-auth/plugins";
=======
import { emailOTP } from "better-auth/plugins";
>>>>>>> 0808b0a (edit register)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: true,
  },
<<<<<<< HEAD

  // ВОТ ЭТОГО НЕ ХВАТАЛО ДЛЯ РЕГИСТРАЦИИ:
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Подтверждение почты",
        html: `<p>Нажмите <a href="${url}">здесь</a>, чтобы подтвердить ваш аккаунт.</p>`,
=======
  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, token }) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Код подтверждения",
        html: `<h1>${token}</h1>`,
>>>>>>> 0808b0a (edit register)
      });
    },
  },
  plugins: [
<<<<<<< HEAD
    twoFactor(),
    magicLink({
      async sendMagicLink({ email, url }) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Вход по ссылке",
          html: `<p>Нажмите <a href="${url}">здесь</a>, чтобы войти в систему.</p>`,
=======
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Код входа",
          html: `<h1>${otp}</h1>`,
>>>>>>> 0808b0a (edit register)
        });
      }
    })
  ]
});