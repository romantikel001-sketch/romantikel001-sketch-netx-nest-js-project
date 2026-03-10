import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function VerifyEmail({
  searchParams
}: {
  searchParams: { token?: string };
}) {

  const token = searchParams.token;

  if (!token) {
    redirect("/login?error=invalid-token");
  }

  const record = await prisma.verification.findFirst({
    where: { value: token }
  });

  if (!record) {
    redirect("/login?error=invalid-token");
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: true }
  });

  await prisma.verification.delete({
    where: { id: record.id }
  });

  redirect("/login?message=email-verified");
}