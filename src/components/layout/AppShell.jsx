"use client";

import { useState } from "react";
import IconRail from "@/components/layout/IconRail";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileDrawer from "@/components/layout/MobileDrawer";

export default function AppShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="dashboard-bg min-h-screen p-2 text-app-text sm:p-4 md:p-6">
      <div className="app-layout-grid mx-auto grid max-w-[1440px] gap-3">
        <IconRail />
        <Sidebar />
        <main className="min-w-0">
          <Navbar onMenuClick={() => setDrawerOpen(true)} />
          <div className="mt-5 sm:mt-7">{children}</div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
