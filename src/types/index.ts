
export interface User {
  name: string;
  role?: string;
  initials?: string;
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
