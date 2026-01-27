
// src/data/staticData.ts
import * as React from 'react';
import type { User, NavItem, HomePageData } from '../types';

// -------------------------
export const currentUser: User = {
  name: 'Shrutika Patil',
  role: 'Merchant Portal',
  initials: 'SP',
};

export const homeData: HomePageData = {
  pageTitle: 'PCI dashboard',
  banner: {
    status: 'Your Network Scans',
    compliance: 'Not Compliant',
    complianceNote: 'Require immediate action',
    actions: ['Start Scan', 'Asset Wizard'],
  },
  stats: {
    totalHosts: { value: '129', note: 'Active network Host Monitored' },
    liveCompliance: { value: '0%', note: 'Require immediate attention' },
  },
  severityLabels: ['Critical', 'High', 'Medium', 'Low'],
  scanDetails: {
    status: 'Undefined',
    lastSubmitted: 'N/A',
    nextDue: 'N/A',
    statusNote: 'Not Started',
    footerButtons: ['Scan History', 'All vulnerabilities'],
  },
  support: {
    title: 'Support Center',
    subtitle: 'General FAQs & help',
    items: [
      'How do I configure my IPS to allow PCI Scans ?',
      'What ip addresses do I need to scan?',
      'What steps do I take after I scan?',
      'How do I generate reports?',
      'How do I change my login credentials?',
    ],
    ctaPrimary: 'PCI Compliance Playbook',
    contactTitle: 'Need personalized help?',
    contactCta: 'Contact Support',
  },
};

// Icons
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import LanOutlined from '@mui/icons-material/LanOutlined';
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export const navItems: NavItem[] = [
  { id: 'home',       label: 'Home',            icon: React.createElement(HomeOutlined), active: true },
  { id: 'network',    label: 'Network',         icon: React.createElement(LanOutlined) },
  { id: 'compliance', label: 'Compliance',      icon: React.createElement(AssignmentTurnedInOutlined) },
  { id: 'account',    label: 'Account',         icon: React.createElement(PersonOutline) },
  { id: 'support',    label: 'Contact Support', icon: React.createElement(ChatBubbleOutline) },
  { id: 'resources',  label: 'Resources',       icon: React.createElement(MenuBookOutlined) },
  { id: 'about',      label: 'About',           icon: React.createElement(InfoOutlined) },
];
