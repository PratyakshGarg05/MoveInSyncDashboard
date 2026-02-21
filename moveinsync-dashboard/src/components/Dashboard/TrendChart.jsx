import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CalendarDays, CalendarRange } from 'lucide-react';

const TrendChart = ({ alerts }) => {
  // Requirement 2: Toggle between daily / weekly views
  const [viewType, setViewType] = useState('daily'); 

  // Requirement 1: Daily/Weekly count of Total, Escalated, Auto-Closed, Resolved
  const chartData = useMemo(() => {
    const grouped = {};

    alerts.forEach(alert => {
      const dateObj = new Date(alert.timestamp);
      let key = '';

      if (viewType === 'daily') {
        key = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // Weekly logic: Group by the start of the week (Sunday)
        const firstDay = new Date(dateObj);
        firstDay.setDate(firstDay.getDate() - firstDay.getDay());
        key = `Week of ${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      }

      if (!grouped[key]) {
        grouped[key] = { 
          name: key, 
          "Total Alerts": 0, 
          "Escalations": 0, 
          "Auto-Closures": 0, 
          "Resolutions": 0,
          rawDate: dateObj.getTime() // For sorting
        };
      }

      grouped[key]["Total Alerts"] += 1;
      if (alert.status === 'ESCALATED') grouped[key]["Escalations"] += 1;
      if (alert.status === 'AUTO-CLOSED') grouped[key]["Auto-Closures"] += 1;
      if (alert.status === 'RESOLVED') grouped[key]["Resolutions"] += 1;
    });

    // Sort chronologically
    return Object.values(grouped).sort((a, b) => a.rawDate - b.rawDate);
  }, [alerts, viewType]);

  // Requirement 3: Hover tooltips showing exact values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6 text-sm mb-1">
              <span className="flex items-center text-gray-600 font-medium">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                {entry.name}
              </span>
              <span className="font-bold text-gray-900">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Trend Over Time</h3>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-1">Lifecycle Analytics</p>
        </div>
        
        {/* Toggle between daily / weekly views */}
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button 
            onClick={() => setViewType('daily')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewType === 'daily' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
            Daily
          </button>
          <button 
            onClick={() => setViewType('weekly')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewType === 'weekly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarRange className="w-3.5 h-3.5 mr-1.5" />
            Weekly
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEscalated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            
            <Area type="monotone" dataKey="Total Alerts" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
            <Area type="monotone" dataKey="Escalations" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorEscalated)" />
            <Area type="monotone" dataKey="Auto-Closures" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorAuto)" />
            <Area type="monotone" dataKey="Resolutions" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;