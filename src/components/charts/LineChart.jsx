function buildPath(points, width, height) {
  if (!points.length) return "";
  const max = Math.max(...points, 1);
  const step = width / (points.length - 1 || 1);
  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - (point / max) * height;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export default function LineChart({ data, legend }) {
  const width = 600;
  const height = 170;
  const yellowPath = buildPath(data.yellow || [], width, height);
  const greenPath = buildPath(data.green || [], width, height);
  const greenFill = `${greenPath} L${width},${height} L0,${height} Z`;
  const yellowFill = `${yellowPath} L${width},${height} L0,${height} Z`;

  return (
    <div className="px-5 pb-5">
      <div className="relative h-64 rounded-xl bg-[rgba(0,0,0,0.08)] pt-3" dir="ltr">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="absolute inset-x-4 top-8 h-[170px] w-[calc(100%-2rem)] overflow-visible">
          <defs>
            <linearGradient id="greenFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#13AC49" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#13AC49" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="yellowFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FCCD03" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#FCCD03" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={yellowFill} fill="url(#yellowFill)" />
          <path d={greenFill} fill="url(#greenFill)" />
          <path d={yellowPath} fill="none" stroke="#FCCD03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={greenPath} fill="none" stroke="#19D99A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="absolute bottom-8 left-4 right-4 border-t border-white/40" />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[11px] text-white">
          {data.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      {legend && (
        <div className="mt-2 flex items-center justify-center gap-16 text-sm text-app-text">
          <span className="inline-flex items-center gap-2"><i className="size-3 rounded-full bg-app-yellow" />{legend.yellow}</span>
          <span className="inline-flex items-center gap-2"><i className="size-3 rounded-full bg-[#19D99A]" />{legend.green}</span>
        </div>
      )}
    </div>
  );
}
