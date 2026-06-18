export default function SectionCard({ title, subtitle, action, children, className = "", contentClassName = "", ...props }) {
  return (
    <section className={`card-shell overflow-hidden rounded-2xl ${className}`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 px-5 py-4">
          {action && <div className="shrink-0 text-xs text-app-yellow">{action}</div>}
          <div className="text-end">
            {title && <h2 className="text-base font-medium text-app-text">{title}</h2>}
            {subtitle && <p className="mt-1 text-xs text-app-muted">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
