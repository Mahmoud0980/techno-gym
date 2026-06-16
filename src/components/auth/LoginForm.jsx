"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { LogoMark } from "@/components/icons/Icons";

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="card-shell w-full max-w-md rounded-3xl p-6 md:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 grid h-16 w-40 place-items-center rounded-2xl bg-black/30 ring-1 ring-app-yellow/20">
          <LogoMark className="scale-125" />
        </div>
        <h1 className="text-2xl font-semibold text-white">تسجيل الدخول</h1>
        <p className="mt-2 text-sm text-app-muted-light">ادخل إلى أنظمة TechnoGYM الإدارية</p>
      </div>

      <div className="space-y-4">
        <label className="block text-right text-sm text-app-muted-light">
          البريد الإلكتروني
          <input
            defaultValue="admin@technogym.local"
            type="email"
            className="mt-2 h-12 w-full rounded-xl border border-app-line bg-app-card-soft px-4 text-right text-white outline-none transition focus:border-app-yellow"
          />
        </label>

        <label className="block text-right text-sm text-app-muted-light">
          كلمة المرور
          <input
            defaultValue="12345678"
            type="password"
            className="mt-2 h-12 w-full rounded-xl border border-app-line bg-app-card-soft px-4 text-right text-white outline-none transition focus:border-app-yellow"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-app-muted-light">
        <a href="#" className="text-app-yellow hover:text-app-yellow/80">نسيت كلمة المرور؟</a>
        <label className="inline-flex items-center gap-2">
          <span>تذكرني</span>
          <input type="checkbox" className="accent-[#fccd03]" defaultChecked />
        </label>
      </div>

      <Button className="mt-7 h-12 w-full text-base" type="submit">دخول</Button>

      <p className="mt-5 rounded-xl bg-[rgba(252,205,3,0.08)] p-3 text-center text-xs text-app-muted-light">
        بيانات تجريبية فقط: يمكنك الضغط على دخول مباشرة.
      </p>
    </form>
  );
}
