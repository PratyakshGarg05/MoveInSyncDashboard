// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { LayoutDashboard, Settings } from 'lucide-react'; 

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-white border-r border-gray-100 fixed h-full flex flex-col z-20 shadow-sm">
//       {/* Logo Area */}
//       <div className="p-6">
//         <h1 className="text-3xl font-black text-blue-600 tracking-tight">Project123</h1>
//         <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-wider">Fleet Operations Panel</p>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 px-4 space-y-2 mt-4">
//         {/* DASHBOARD LINK (Bina page reload ke) */}
//         <Link 
//           to="/" 
//           className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
//             location.pathname === '/' 
//               ? 'bg-blue-50 text-blue-600 shadow-sm' 
//               : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
//           }`}
//         >
//           <LayoutDashboard className="w-5 h-5" />
//           <span>Dashboard</span>
//         </Link>

//         {/* RULE CONFIGURATION LINK (Bina page reload ke) */}
//         <Link 
//           to="/rules" 
//           className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
//             location.pathname === '/rules' 
//               ? 'bg-blue-50 text-blue-600 shadow-sm' 
//               : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
//           }`}
//         >
//           <Settings className="w-5 h-5" />
//           <span>Rule Configuration</span>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, X } from 'lucide-react'; 

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* MOBILE DARK OVERLAY: Jab menu khula ho toh peeche andhera karne ke liye */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* THE SIDEBAR ITSELF */}
      <div className={`w-64 bg-white border-r border-gray-100 fixed inset-y-0 left-0 flex flex-col z-50 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Logo & Close Button */}
        <div className="p-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-blue-600 tracking-tight">MoveInSync</h1>
            <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-wider">Fleet Operations</p>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-2">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} // Link click hone par mobile menu band ho jaye
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              location.pathname === '/' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/rules" 
            onClick={() => setIsOpen(false)} 
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              location.pathname === '/rules' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Rule Configuration</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;