import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="dashboard-bg grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-5xl">
        <Link href="/" className="mb-6 inline-flex text-sm text-app-yellow hover:text-app-yellow/80">العودة للصفحة الرئيسية</Link>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_440px]">
          <section className="text-right">
            <p className="text-sm text-app-yellow">TechnoGYM</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-app-text sm:text-4xl lg:text-5xl">
              نظام موحد للمحاسبة والتقارير داخل النادي الرياضي
            </h2>
            <p className="mt-5 max-w-lg text-sm text-app-muted-light sm:text-base">
              الواجهة مبنية بأسلوب مستوحى من تصميم Figma، مع ألوان ثابتة ومكونات قابلة لإعادة الاستخدام داخل NextJS.
            </p>
          </section>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
