import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import RuleConfig from './pages/RuleConfig';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Left Side: Fixed Sidebar */}
        <Sidebar />
        
        {/* Right Side: Main Content Area (ml-64 offset the 64-width sidebar) */}
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rules" element={<RuleConfig />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;