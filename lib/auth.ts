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
      console.log(`>>> Отправка кода регистрации для ${user.email}: ${token}`);
      
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Код подтверждения регистрации",
        html: `<h1>Ваш код: ${token}</h1>`,
      });

      if (error) {
        console.error("Ошибка Resend:", error);
      } else {
        console.log("Письмо успешно отправлено:", data?.id);
      }
    },
  },
 plugins: [
    emailOTP({
      expiresIn: 180,
      sendVerificationOnSignUp: true, 
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Отправка Кода(${type}) для ${email}: ${otp}`);
        
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Ваш код подтверждения",
          html: `<h1>Код: ${otp}</h1>`,
        });

        if (error) console.error("Ошибка Resend:", error);
        else console.log("Письмо ушло! ID:", data?.id);
      },
    }),
  ],
})