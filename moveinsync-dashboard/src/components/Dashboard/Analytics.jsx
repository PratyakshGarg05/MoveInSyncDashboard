import React, { useMemo } from 'react';
import {
    PieChart, Pie, Cell, Tooltip as PieTooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, ResponsiveContainer
} from 'recharts';
import { AlertCircle, Activity } from 'lucide-react';

const Analytics = ({ alerts }) => {
    // 1. Prepare Data for Donut Chart (Severity)
    const severityData = useMemo(() => {
        const counts = { Critical: 0, Warning: 0, Info: 0 };
        alerts.forEach(a => { if (counts[a.severity] !== undefined) counts[a.severity]++; });

        return [
            { name: 'Critical', value: counts.Critical, color: '#ef4444' },
            { name: 'Warning', value: counts.Warning, color: '#f59e0b' },
            { name: 'Info', value: counts.Info, color: '#3b82f6' }
        ].filter(item => item.value > 0); // Hide empty segments
    }, [alerts]);

    // 2. Prepare Data for Horizontal Bar Chart (Source Modules)
    const sourceData = useMemo(() => {
        const counts = {};
        alerts.forEach(a => {
            counts[a.source] = (counts[a.source] || 0) + 1;
        });

        return Object.keys(counts).map(key => ({
            name: key,
            count: counts[key]
        })).sort((a, b) => b.count - a.count); // Sort by highest count
    }, [alerts]);

    const CustomPieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm font-bold">
                    <span style={{ color: payload[0].payload.color }}>{payload[0].name}: </span>
                    <span className="text-gray-800">{payload[0].value} Alerts</span>
                </div>
            );
        }
        return null;
    };

    const CustomBarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm font-bold">
                    <p className="text-gray-500 text-xs uppercase mb-1">{label}</p>
                    <span className="text-blue-600">{payload[0].value} Alerts</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Chart 1: Donut Chart for Severity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-bold text-gray-800">Alerts by Severity</h3>
                </div>
                <div className="h-[220px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={severityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60} 
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {severityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <PieTooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                        <span className="text-2xl font-black text-gray-800">{alerts.length}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Total</span>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="flex justify-center space-x-4 mt-2">
                    {severityData.map(item => (
                        <div key={item.name} className="flex items-center text-xs font-bold text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                            {item.name} ({item.value})
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart 2: Horizontal Bar Chart for Source */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Activity className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-bold text-gray-800">Alerts by Source Module</h3>
                </div>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                width={100}
                            />
                            <BarTooltip content={<CustomBarTooltip />} cursor={{ fill: '#f8fafc' }} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                                {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#60a5fa'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default Analytics;