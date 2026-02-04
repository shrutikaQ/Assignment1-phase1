// src/App.tsx
import React from "react";

import { Header } from "@components/Header/Header";
import { ResponsiveSidebar } from "@components/Sidebar/ResponsiveSidebar";

import { NetworkPage } from "@pages/Network";
import Home from "@pages/Home/Home"; // ✅ default import
import { ContactSupport } from "@pages/ContactSupport/ContactSupport"; // ✅ NEW: Contact page

import type { User } from "@types";
import { navItems as initialNav, homeData } from "@data/staticData";
import ScanSettings from "@pages/Home/NewScan";

// If this CSS is truly next to App.tsx under src/styles, keep it.
// Otherwise adjust to the correct relative path or an alias like "@styles/..."
import "./styles/sidebar-responsive.css";

// ✅ Keep your existing default user
const DEFAULT_USER: User = {
  name: "Shrutika Patil",
  role: "Merchant Portal",
  initials: "SP",
  email: "shrutika.patil@example.com",
};

// ✅ Full-screen logged-out message
function LoggedOutFullScreen({ text }: { text: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f3f4f6",
        padding: 24,
      }}
      aria-label="logged-out-screen"
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "28px 24px",
          fontSize: 18,
          fontWeight: 700,
          color: "#0f172a",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function App() {
  // Sidebar nav
  const [items, setItems] = React.useState(initialNav);
  const activeId = items.find((i) => i.active)?.id ?? "home";

  // user: undefined = deciding; null = logged out; User = logged in
  const [user, setUser] = React.useState<User | null | undefined>(undefined);

  // ✅ THEME: restore on mount and expose toggle
  // We don't need to keep theme in React state unless you want UI to react to it.
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  // On mount, restore a user (do NOT persist logout)
  React.useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    setUser(stored ? JSON.parse(stored) : DEFAULT_USER);
  }, []);

  const handleSelect = (id: string) => {
    setItems((prev) => prev.map((x) => ({ ...x, active: x.id === id })));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.clear();
    setUser(null);
  };

  const handleLoginAs = (u: User) => {
    localStorage.setItem("currentUser", JSON.stringify(u));
    setUser(u);
  };

  // Prevent flicker while deciding user on first mount
  if (user === undefined) return null;

  // When logged out → show only the message
  if (user === null) return <LoggedOutFullScreen text="You are logged out." />;

  // ✅ Main content router
  const renderContent = () => {
    switch (activeId) {
      case "network":
        return <NetworkPage />;
      case "scan":
        return <ScanSettings />; // or <ScanSettingsGlass />
      case "support":
        return <ContactSupport />;
      case "home":
      default:
        return (
          <Home
            data={homeData}
            onNewScan={() => handleSelect("scan")} // ✅ pass callback to Home
          />
        );
    }
  };

  // ✅ Logged in → full app layout
  return (
    <div className="layout" style={{ display: "flex", minHeight: "100vh" }}>
      <ResponsiveSidebar
        items={items}
        onSelect={handleSelect}
        product="PCI"
        subProduct="PCI Compliance"
        hoverExpand
        desktopMinWidth={992}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* You can also pass a prop to Header like onToggleTheme={toggleTheme} if Header supports it */}
        <Header user={user} onLogout={handleLogout} onLogin={handleLoginAs} />

        {/* Simple position for a Theme Toggle button (top-right, over content). Move it wherever you like. */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          style={{
            position: "fixed",
            right: 16,
            top: 72, // below header
            zIndex: 50,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--border-color, #e5e7eb)",
            background: "var(--background-color, #ffffff)",
            color: "var(--text-color, #111827)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            cursor: "pointer",
          }}
        >
          Toggle Theme
        </button>

        <main className="main" style={{ flex: 1 }}>{renderContent()}</main>
      </div>
    </div>
  );
}