# Intelligent Alert Management & Visualization UI 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cypress](https://img.shields.io/badge/cypress-%2317202C.svg?style=for-the-badge&logo=cypress&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

A high-performance, real-time fleet alert monitoring dashboard built for the **MoveInSync Frontend Assignment**. This application allows fleet managers to monitor critical alerts, analyze lifecycle trends, and dynamically configure escalation rules.

## 🏗 Architecture Overview

The application follows a modular, client-side architecture optimized for performance and scalability:

- **Global State Management:** Utilizes React's native Context API (`AlertContext`) to manage fleet data globally, avoiding prop-drilling and ensuring that Rule Engine configurations instantly reflect across the Dashboard.
- **Component-Driven UI:** The interface is broken down into atomic components (Analytics, TrendCharts, AlertTables) for high reusability and isolated testing.
- **Route-Level Code Splitting:** Implemented `React.lazy` and `Suspense` for primary routes (`/` and `/rules`) alongside structural Skeleton Loaders to optimize the Largest Contentful Paint (LCP).
- **Simulated Asynchronous Layer:** Since no live backend was provided, a simulated async layer using Promises orchestrates mock data fetching, complete with simulated network latency to demonstrate loading states and error handling.

## 🧠 Core Design Decisions

1. **Manual Data Caching (Performance Optimization):**
   To prevent redundant API calls upon re-renders or page refreshes, the application implements a manual caching strategy using the browser's `LocalStorage` API. The simulated fetch only triggers if the cache is empty, ensuring a lightning-fast user experience.

2. **Strict Design Consistency via Tailwind CSS:**
   Rather than using inline styles or scattered CSS files, the UI strictly adheres to a unified design token system using Tailwind CSS. 
   - **Semantic Colors:** Red/Amber/Green strict usage for alert statuses.
   - **Uniform Spacing:** Consistent padding (`p-6`, `p-8`) and border-radii (`rounded-xl`) to mimic a premium SaaS interface.

3. **Dynamic Rule-to-Dashboard Syncing:**
   The Rule Configuration engine doesn't just toggle states—it acts as a live filter. Editing a rule's "Action" (e.g., from *Escalate* to *Auto-Close*) dynamically re-evaluates the mock data stream and updates the Dashboard metrics in real-time.

4. **Graceful Error & Empty State Handling:**
   Instead of application crashes, errors (like network failures or invalid rule thresholds) are caught and displayed via user-friendly UI banners, complete with actionable retry mechanisms (`window.location.reload()`).

## 🧪 Testing Strategy

The project follows a robust testing pyramid ensuring high reliability:
- **E2E Testing (Cypress):** Automates critical user journeys, such as navigating from the Dashboard to the Rule Configuration page, interacting with modals, and verifying DOM updates.
- **Unit Testing (Jest & RTL):** Isolates and tests critical UI components to ensure proper rendering of headers, tables, and conditional elements.

## ⚙️ Setup & Installation Instructions

Follow these steps to run the project locally:

**1. Clone the repository**
git clone https://github.com/PratyakshGarg05/MoveInSyncDashboard.git
cd MoveInSyncDashboard

**2. Install dependencies**
npm install

**3. Start the development server**
npm run dev

The application will be accessible at http://localhost:5173.

**4. Run E2E Tests (Cypress)**
npx cypress open

**5. Run Unit Tests (Jest)**
npm run test