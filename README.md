⚙️ Setup Instructions (React + TypeScript Project)
Follow these steps to set up and run the PCI Sample Dashboard – Phase 1 (Static React + TypeScript UI).

1️⃣ Install Prerequisites
Make sure the following are installed on your system:
✔ Node.js (LTS version recommended)
Download from:
https://nodejs.org
✔ Package Manager: npm (comes with Node.js)
✔ A Code Editor
VS Code recommended:
https://code.visualstudio.com

2️⃣ Create a New React + TypeScript Project
You can create a React + TypeScript project using Vite.
Run the following commands in your terminal:
Shellnpm create vite@latestShow more lines
When prompted:

Project name: your‑project‑name
Framework: React
Variant: TypeScript

Example inputs:
? Project name: react-ts-pci-home-v2
? Select a framework: › React
? Select a variant: › TypeScript


3️⃣ Navigate into the Project Folder
Shellcd react-ts-pci-home-v2Show more lines

4️⃣ Install Dependencies
Install required packages listed in package.json:
Shellnpm installShow more lines
This installs:

React
React DOM
TypeScript
Vite
@types packages for TS
Dev tools


5️⃣ Run the Development Server
Start the app locally:
Shellnpm run devShow more lines
Vite will start a server and show output like:
Local:   http://localhost:5173/

Open this URL in your browser.

6️⃣ Project Folder Structure (Phase 1)
Your project should have a clean structure:
src/
│── assets/                 # Images, logos
│── components/             # UI components
│   ├── Header/
│   ├── Sidebar/
│   └── MainContent/
│── data/                   # Static data using TS interfaces
│── styles/                 # CSS files
│── types/                  # TypeScript types/interfaces
│── App.tsx
│── main.tsx
public/
index.html
package.json
tsconfig.json
vite.config.ts


7️⃣ Phase 1 Requirements
To complete Phase 1, ensure:
✔ React Components

Header
Sidebar
Main Content layout
Reusable, functional components

✔ TypeScript

Interfaces
Typed props
Static data rendered in UI

✔ No dynamic logic yet

❌ No Redux Toolkit
❌ No API calls
❌ No charts

✔ Clean UI with static content

8️⃣ Build for Production (Optional)
To generate the production build:
Shellnpm run buildShow more lines
Build output goes to:
dist/

Optional local preview:
Shellnpm run previewShow more lines

9️⃣ Recommended Extensions (VS Code)
Install these extensions:

ESLint
Prettier
TypeScript React (tsx) support
Vite extension (optional)
