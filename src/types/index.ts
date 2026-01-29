

// src/types.ts
export type User = {
  name: string;
  role?: string;
  initials?: string;
  email?: string;
  avatarUrl?: string;
};


// src/types/index.ts
export type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode; // important
  href?: string;
  active?: boolean;
};


export interface HomePageData {
  pageTitle: string; // "PCI dashboard"
  banner: {
    status: string; // "Your Network Scans"
    compliance: string; // "Not Compliant"
    complianceNote: string; // "Require immediate action"
    actions: string[]; // ["Start Scan", "Asset Wizard"]
  };
  
  stats: {
    totalHosts: { value: string; note: string };
    liveCompliance: { value: string; note: string };
  };
  severityLabels: string[]; // [Critical, High, Medium, Low]
  scanDetails: {
    status: string; // Undefined
    lastSubmitted: string; // N/A
    nextDue: string; // N/A
    statusNote: string; // Not Started
    footerButtons: string[]; // [Scan History, All vulnerabilities]
  };
  support: {
    title: string; // Support Center
    subtitle: string; // General FAQs & help
    items: string[];
    ctaPrimary: string; // PCI Compliance Playbook
    contactTitle: string; // Need personalized help?
    contactCta: string; // Contact Support
  };
}
// src/data/staticData.ts (excerpt)
export const navItems = [
  { id: 'home', label: 'Home', icon: 'home', active: true },
  { id: 'network', label: 'Network', icon: 'lan' },
  { id: 'contact', label: 'Contact Support', icon: 'support' }, // ✅ add this
  // ...
];




