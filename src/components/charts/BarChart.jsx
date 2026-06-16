export default function BarChart({ data = [] }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-40 items-end justify-between gap-2 px-5 pb-4" dir="ltr">
      {data.map((item) => (
        <div key={`${item.label}-${item.value}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div
            className="w-full max-w-5 rounded-t-sm bg-gradient-to-t from-[#c3ad51] to-[#e2cb68]"
            style={{ height: `${Math.max((item.value / max) * 100, 5)}%` }}
          />
          <span className="text-[10px] text-white">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
