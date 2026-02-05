// src/App.tsx
import React from "react";

import { Header } from "@components/Header/Header";
import { ResponsiveSidebar } from "@components/Sidebar/ResponsiveSidebar";

import { NetworkPage } from "@pages/Network";
import Home from "@pages/Home/Home";
import { ContactSupport } from "@pages/ContactSupport/ContactSupport";
import ScanSettings from "@pages/Home/NewScan";   // <-- your original page, stays untouched

import type { User } from "@types";
import { navItems as initialNav, homeData } from "@data/staticData";

import "./styles/sidebar-responsive.css";

// ⭐ Redux Demo Components (ONLY for Scans Demo page)
import ScanControls from "./components/ScanControls";
import ScansList from "./components/Scanlist"; // your file name

const DEFAULT_USER: User = {
  name: "Shrutika Patil",
  role: "Merchant Portal",
  initials: "SP",
  email: "shrutika.patil@example.com",
};

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
  const [items, setItems] = React.useState(initialNav);
  const activeId = items.find((i) => i.active)?.id ?? "home";

  const [user, setUser] = React.useState<User | null | undefined>(undefined);

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

  if (user === undefined) return null;
  if (user === null) return <LoggedOutFullScreen text="You are logged out." />;

  // ⭐ ROUTES
  const renderContent = () => {
    switch (activeId) {
      case "network":
        return <NetworkPage />;

      case "scan":
        // ⭐ Your original New Scan page — unchanged
        return <ScanSettings />;

      case "support":
        return <ContactSupport />;

      case "scans":
        // ⭐ ONLY THIS PAGE USES REDUX SCAN DEMO
        return (
          <div style={{ padding: 16 }}>
            <h2>Redux Toolkit – Scans Demo</h2>
            <ScanControls />   {/* Redux start scan */}
            <ScansList />      {/* Redux list */}
          </div>
        );

      case "home":
      default:
        return (
          <Home
            data={homeData}
            onNewScan={() => handleSelect("scan")} // keep your existing flow
          />
        );
    }
  };

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
        <Header user={user} onLogout={handleLogout} onLogin={handleLoginAs} />

        <main className="main" style={{ flex: 1 }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}