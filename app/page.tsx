import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    // Используем твои системные цвета из шаблона: bg-zinc-50 и dark:bg-black
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        {/* Логотип из твоего оригинального кода */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* Карточка регистрации shadcn/ui */}
        <Card className="w-full shadow-lg border-zinc-200 dark:border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Создать аккаунт</CardTitle>
            <CardDescription className="text-center">
              Введите данные для регистрации в системе
            </CardDescription>
          </CardHeader>
          
          <form>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              {/* Используем кнопку shadcn, но стилизуем под твой шаблон */}
              <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                Зарегистрироваться
              </Button>
              
              <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
                Уже есть аккаунт?{" "}
                <a href="#" className="font-medium text-black dark:text-white hover:underline">
                  Войти
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}