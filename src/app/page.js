import Link from "next/link";
import { systemCards } from "@/data/mockData";
import Button from "@/components/ui/Button";
import { GridIcon, LogoMark } from "@/components/icons/Icons";

export default function HomePage() {
  return (
    <main className="dashboard-bg min-h-screen px-4 py-8 text-app-text md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="panel-shell flex items-center justify-between rounded-2xl px-5 py-4">
          <Button href="/login" tone="outline">تسجيل الدخول</Button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-lg font-medium text-app-text">TechnoGYM</h1>
              <p className="text-xs text-app-muted-light">بوابة الأنظمة الداخلية</p>
            </div>
            <div className="grid h-12 w-32 place-items-center rounded-xl bg-black/30 ring-1 ring-app-yellow/20">
              <LogoMark />
            </div>
          </div>
        </header>

        <section className="py-16 text-center">
          <p className="text-sm text-app-yellow">اختر النظام المطلوب</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight text-app-text md:text-6xl">
            منصة واحدة لإدارة محاسبة النادي والتقارير
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-app-muted-light md:text-base">
            هذه الواجهة هي نقطة دخول مبدئية بين نظام المحاسبة ونظام التقارير، وقابلة لاحقاً لإضافة قسم إدارة النادي عند اكتماله.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {systemCards.map((card) => {
            const content = (
              <article className={`card-shell group h-full rounded-3xl p-6 transition ${card.disabled ? "opacity-60" : "hover:-translate-y-1 hover:border-app-yellow/60"}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[rgba(252,205,3,0.12)] px-3 py-1 text-xs text-app-yellow">{card.badge}</span>
                  <div className="grid size-12 place-items-center rounded-2xl bg-[rgba(252,205,3,0.16)] text-app-yellow">
                    <GridIcon />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl font-medium text-app-text">{card.title}</h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-app-muted-light">{card.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {card.stats.map((stat) => (
                    <span key={stat} className="rounded-lg bg-app-card-soft px-3 py-2 text-xs text-app-muted-light">{stat}</span>
                  ))}
                </div>
              </article>
            );

            if (card.disabled) {
              return <div key={card.title}>{content}</div>;
            }

            return (
              <Link key={card.title} href={card.href}>
                {content}
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
