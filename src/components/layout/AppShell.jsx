import IconRail from "@/components/layout/IconRail";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function AppShell({ children }) {
  return (
    <div className="dashboard-bg min-h-screen p-4 text-app-text md:p-6">
      <div className="app-layout-grid mx-auto grid max-w-[1440px] gap-3">
        <IconRail />
        <Sidebar />
        <main className="min-w-0">
          <Navbar />
          <div className="mt-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
