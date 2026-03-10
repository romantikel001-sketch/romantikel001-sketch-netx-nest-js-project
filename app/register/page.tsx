import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    let success = false;

    try {
      const email = formData.get("email");
      const password = formData.get("password");

      console.log("Создаем пользователя в Prisma:", email);
      
      success = true; 
    } catch (error) {
      console.error("Ошибка базы данных:", error);
    }
    if (success) {
      redirect("/"); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">Регистрация</h2>
        
        <form action={register} className="space-y-5">
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Пароль" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Уже с нами? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}