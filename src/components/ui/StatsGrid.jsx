import StatCard from "@/components/ui/StatCard";

export default function StatsGrid({ items = [], className = "" }) {
  return (
    <section className={`grid grid-auto-fit gap-5 ${className}`}>
      {items.map((item) => (
        <StatCard key={`${item.title}-${item.value}`} {...item} />
      ))}
    </section>
  );
}
