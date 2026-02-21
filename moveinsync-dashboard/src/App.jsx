// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './pages/Dashboard';
// import RuleConfig from './pages/RuleConfig';

// // NAYA IMPORT: App ko global data se connect karne ke liye
// import { AlertProvider } from './context/AlertContext';

// function App() {
//   return (
//     // NAYA: Poore Router ko AlertProvider ke andar wrap kar diya
//     <AlertProvider>
//       <Router>
//         <div className="flex bg-gray-50 min-h-screen">
//           {/* Left Side: Fixed Sidebar */}
//           <Sidebar />
          
//           {/* Right Side: Main Content Area (ml-64 offset the 64-width sidebar) */}
//           <div className="flex-1 ml-64">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/rules" element={<RuleConfig />} />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </AlertProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react'; 

import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import RuleConfig from './pages/RuleConfig';
import { AlertProvider } from './context/AlertContext';

function App() {
  // Mobile me sidebar open/close karne ki state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AlertProvider>
      <Router>
        <div className="flex bg-gray-50 min-h-screen relative overflow-hidden">
          
          {/* MOBILE HEADER (Sirf choti screens par dikhega) */}
          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 shadow-sm">
            <h1 className="text-xl font-black text-blue-600 tracking-tight">MoveInSync</h1>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* SIDEBAR */}
          <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          
          {/* MAIN CONTENT AREA */}
          {/* md:ml-64 -> Desktop par margin, Mobile par 0. pt-16 -> Mobile header ke liye upar jagah */}
          <div className="flex-1 w-full md:ml-64 pt-16 md:pt-0 transition-all duration-300 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rules" element={<RuleConfig />} />
            </Routes>
          </div>

        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;