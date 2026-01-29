// src/App.tsx
import React from 'react';

import { Header } from '@components/Header/Header';
import { ResponsiveSidebar } from '@components/Sidebar/ResponsiveSidebar';

import { NetworkPage } from '@pages/Network';
import Home from '@pages/Home/Home'; // ✅ default import
import { ContactSupport } from '@pages/ContactSupport/ContactSupport'; // ✅ NEW: Contact page

import type { User } from '@types';
import { navItems as initialNav, homeData } from '@data/staticData';
import ScanSettings from '@pages/Home/NewScan'; 
import './styles/sidebar-responsive.css';

const DEFAULT_USER: User = {
  name: 'Shrutika Patil',
  role: 'Merchant Portal',
  initials: 'SP',
  email: 'shrutika.patil@example.com',
};

// Full-screen logged-out message
function LoggedOutFullScreen({ text }: { text: string }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f3f4f6',
        padding: 24,
      }}
      aria-label="logged-out-screen"
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '28px 24px',
          fontSize: 18,
          fontWeight: 700,
          color: '#0f172a',
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function App() {
  const [items, setItems] = React.useState(initialNav);
  const activeId = items.find((i) => i.active)?.id ?? 'home';

  // user: undefined = deciding; null = logged out; User = logged in
  const [user, setUser] = React.useState<User | null | undefined>(undefined);

  // On mount, restore a user (do NOT persist logout)
  React.useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    setUser(stored ? JSON.parse(stored) : DEFAULT_USER);
  }, []);

  const handleSelect = (id: string) => {
    setItems((prev) => prev.map((x) => ({ ...x, active: x.id === id })));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    setUser(null);
  };

  const handleLoginAs = (u: User) => {
    localStorage.setItem('currentUser', JSON.stringify(u));
    setUser(u);
  };

  // Prevent flicker while deciding user on first mount
  if (user === undefined) return null;

  // When logged out → show only the message
  if (user === null) return <LoggedOutFullScreen text="You are logged out." />;

  

const renderContent = () => {
  switch (activeId) {
    case 'network':
      return <NetworkPage />;
    case 'scan':
      return <ScanSettings />; // or <ScanSettingsGlass />
    case 'support':
      return <ContactSupport />;
    case 'home':
    default:
      return (
        <Home
          data={homeData}
          onNewScan={() => handleSelect('scan')} // ✅ pass callback to Home
        />
      );
  }
};



  // Logged in → full app layout
  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <ResponsiveSidebar
        items={items}
        onSelect={handleSelect}
        product="PCI"
        subProduct="PCI Compliance"
        hoverExpand
        desktopMinWidth={992}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header user={user} onLogout={handleLogout} onLogin={handleLoginAs} />
        <main className="main" style={{ flex: 1 }}>{renderContent()}</main>
      </div>
    </div>
  );
}
