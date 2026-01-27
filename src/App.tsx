
// src/App.tsx
import React, { useState } from 'react';

import { Header } from '@components/Header/Header';
import { ResponsiveSidebar } from '@components/Sidebar/ResponsiveSidebar';
import { MainContent } from '@components/MainContent/MainContent';

import { currentUser, navItems as initialNav, homeData } from '@data/staticData';

// If you have an alias for styles, prefer this:
import './styles/sidebar-responsive.css';
// Otherwise, use a relative path (uncomment the next line and remove the alias import):
// import './styles/sidebar-responsive.css';

export default function App() {
  // Keep a local copy so we can toggle the active item on click
  const [items, setItems] = useState(initialNav);

  const handleSelect = (id: string) => {
    setItems(prev => prev.map(x => ({ ...x, active: x.id === id })));
    // If you use React Router, navigate here based on `id`
    // e.g., navigate(`/route-for/${id}`)
  };

  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left rail (responsive: mini/full, hover-expand, pin) */}
      <ResponsiveSidebar
        items={items}
        onSelect={handleSelect}
        product="PCI"
        subProduct="PCI Compliance"
        hoverExpand={true}
        desktopMinWidth={992} // change breakpoint if needed
      />

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header user={currentUser} />
        <main className="main" style={{ flex: 1 }}>
          <MainContent data={homeData} />
        </main>
      </div>
    </div>
  );
}
