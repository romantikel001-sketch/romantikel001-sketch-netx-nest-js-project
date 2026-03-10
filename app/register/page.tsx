import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      redirect("/register?error=passwords-dont-match");
    }

    redirect("/login?message=success"); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-6">Создать аккаунт</h2>
        
        <form action={register} className="space-y-4">
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Пароль" 
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          <input 
            name="confirmPassword" 
            type="password" 
            placeholder="Повторите пароль" 
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98]"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Уже есть аккаунт?{" "}
            <Link 
              href="/login" 
              className="font-semibold hover:underline underline-offset-4"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}