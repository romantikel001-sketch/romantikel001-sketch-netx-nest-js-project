import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const email = formData.get("email");
    console.log("Вход пользователя:", email);


    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-6">С возвращением</h1>
        
        <form action={login} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="password" type="password" placeholder="Пароль" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition">
            Войти
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Нет аккаунта? <Link href="/register" className="text-blue-600 hover:underline">Регистрация</Link>
        </p>
      </div>
    </div>
  );
}