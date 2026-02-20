import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 p-4 z-10">
            <div className="mb-8 px-4 mt-4">
                <h2 className="text-2xl font-black text-blue-600 tracking-tight">MoveInSync</h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Fleet Operations Panel</p>
            </div>

            <nav className="space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/rules"
                    className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <Settings className="w-5 h-5" />
                    <span>Rule Configuration</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;