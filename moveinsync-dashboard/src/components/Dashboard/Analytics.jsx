import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// NAYA: alerts prop receive kiya
const Analytics = ({ alerts = [] }) => {
    // Area Chart (Trend over time) can remain generic as it shows historical data
    const trendData = [
        { name: 'Mon', total: 40, escalated: 10 },
        { name: 'Tue', total: 30, escalated: 5 },
        { name: 'Wed', total: 50, escalated: 15 },
        { name: 'Thu', total: 20, escalated: 3 },
        { name: 'Fri', total: 60, escalated: 20 },
        { name: 'Sat', total: 45, escalated: 12 },
        { name: 'Sun', total: alerts.length + 5, escalated: alerts.filter(a => a.status === 'ESCALATED').length + 2 },
    ];

    // FIXED: Real-time calculation based strictly on the current alerts data
    const criticalCount = alerts.filter(a => a.severity === 'Critical').length;
    const warningCount = alerts.filter(a => a.severity === 'Warning').length;
    const infoCount = alerts.filter(a => a.severity === 'Info').length;

    const severityData = [
        { name: 'Critical', value: criticalCount, color: '#ef4444' },
        { name: 'Warning', value: warningCount, color: '#f59e0b' },
        { name: 'Info', value: infoCount, color: '#3b82f6' },
    ];

    const totalAlerts = alerts.length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-gray-700">Trend Over Time (Last 7 Days)</h3>
                    <select className="text-xs border-gray-200 rounded-md text-gray-500 px-2 py-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#dbeafe" name="Total Alerts" />
                            <Area type="monotone" dataKey="escalated" stroke="#ef4444" fill="#fee2e2" name="Escalated" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Alert Distribution by Severity</h3>
                <div className="h-64 w-full flex justify-center items-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={severityData}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {severityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-gray-800">{totalAlerts}</span>
                        <span className="text-xs text-gray-500">Total Alerts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;