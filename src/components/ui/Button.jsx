import Link from "next/link";

const toneClass = {
  primary: "bg-app-yellow text-black hover:bg-app-yellow/90",
  ghost: "bg-app-card-soft text-app-text hover:bg-white/10",
  outline: "border border-app-line bg-app-panel-soft text-app-muted-light hover:border-app-yellow/60 hover:text-app-yellow",
};

export default function Button({ href, children, icon, className = "", tone = "primary", ...props }) {
  const classes = `inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition ${toneClass[tone]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon}
      {children}
    </button>
  );
}
