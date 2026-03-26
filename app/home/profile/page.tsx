import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileClient from "./ProfileClient"; // Наш новый клиентский компонент

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { products: { orderBy: { createdAt: 'desc' } } },
  });

  if (!user) return null;

  // Передаем данные пользователя и его товары в клиентский компонент
  return <ProfileClient user={user} products={user.products} />;
}