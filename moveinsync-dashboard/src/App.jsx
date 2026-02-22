import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';

import Sidebar from './components/layout/Sidebar';
import { AlertProvider } from './context/AlertContext';

// ✅ Now BOTH pages are lazy-loaded
const Dashboard = lazy(() => import('./pages/Dashboard'));
const RuleConfig = lazy(() => import('./pages/RuleConfig'));

// ✅ Proper Skeleton Loader (not a spinner pretending to be modern)
const PageSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    {/* Header skeleton */}
    <div className="h-8 bg-gray-300 rounded w-1/3"></div>

    {/* Card grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-32 bg-gray-300 rounded-xl"></div>
      <div className="h-32 bg-gray-300 rounded-xl"></div>
      <div className="h-32 bg-gray-300 rounded-xl"></div>
    </div>
    {/* Table/List skeleton */}
    <div className="space-y-3">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AlertProvider>
      <Router>
        <div className="flex bg-gray-50 min-h-screen relative overflow-hidden">

          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 shadow-sm">
            <h1 className="text-xl font-black text-blue-600 tracking-tight">
              MoveInSync
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

          <div className="flex-1 w-full md:ml-64 pt-16 md:pt-0 transition-all duration-300 min-w-0">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rules" element={<RuleConfig />} />
              </Routes>
            </Suspense>
          </div>

        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;