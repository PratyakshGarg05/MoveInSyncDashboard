// import React, { useState } from 'react';
// import { Bot, Clock, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';

// const AutoClosedPanel = ({ alerts }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [timeFilter, setTimeFilter] = useState('ALL'); // NAYA: Time Filter State
//     const itemsPerPage = 4;

//     const getResolutionReason = (alertSource) => {
//         switch (alertSource) {
//             case 'Overspeeding': return 'Speed normalized for 15 mins';
//             case 'Document Expiry': return 'Document renewed & verified';
//             case 'Hard Braking': return 'Driving behavior stabilized';
//             case 'Route Deviation': return 'Vehicle returned to assigned route';
//             case 'Negative Feedback': return 'Passenger updated rating';
//             default: return 'System auto-reconciled';
//         }
//     };

//     // NAYA: Filtering Logic (Time based)
//     const filteredAlerts = alerts
//         .filter(a => a.status === 'AUTO-CLOSED')
//         .filter(a => {
//             if (timeFilter === 'ALL') return true;
//             const alertTime = new Date(a.timestamp).getTime();
//             const now = Date.now();
//             if (timeFilter === '24H') return (now - alertTime) <= 24 * 60 * 60 * 1000;
//             if (timeFilter === '7D') return (now - alertTime) <= 7 * 24 * 60 * 60 * 1000;
//             return true;
//         })
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//     // Pagination Logic
//     const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);

//     // NAYA: CSV Export Functionality
//     const handleExportCSV = () => {
//         if (filteredAlerts.length === 0) return;

//         // CSV Headers
//         const headers = ['Alert ID', 'Original Source', 'Resolution Reason', 'Timestamp', 'Driver', 'Vehicle'];

//         // CSV Rows
//         const csvRows = filteredAlerts.map(alert => [
//             alert.id,
//             alert.source,
//             getResolutionReason(alert.source),
//             new Date(alert.timestamp).toLocaleString(),
//             alert.driver,
//             alert.vehicleId
//         ]);

//         // Combine Headers and Rows
//         const csvContent = [
//             headers.join(','),
//             ...csvRows.map(row => row.map(cell => `"${cell}"`).join(',')) // Escaping commas in text
//         ].join('\n');

//         // Create Blob and Trigger Download
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', `Auto_Closed_Log_${timeFilter}_${new Date().toISOString().split('T')[0]}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     if (filteredAlerts.length === 0 && timeFilter === 'ALL') return null;

//     return (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
//             {/* Header with Filters & Export Button */}
//             <div className="flex flex-col mb-5 space-y-3">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h3 className="text-lg font-bold text-gray-800">Auto-Closed Log</h3>
//                         <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-1">System Transparency</p>
//                     </div>
//                     <div className="p-2 bg-slate-100 rounded-lg">
//                         <Bot className="w-5 h-5 text-slate-600" />
//                     </div>
//                 </div>

//                 {/* NAYA: Controls Row (Filter + Export) */}
//                 <div className="flex items-center justify-between pt-2">
//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 border-gray-100">
//                         <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
//                         <select
//                             value={timeFilter}
//                             onChange={(e) => {
//                                 setTimeFilter(e.target.value);
//                                 setCurrentPage(1); // Reset page on filter change
//                             }}
//                             className="bg-transparent p-1.5 text-xs font-bold text-gray-600 outline-none cursor-pointer"
//                         >
//                             <option value="ALL">All Time</option>
//                             <option value="24H">Last 24 Hours</option>
//                             <option value="7D">Last 7 Days</option>
//                         </select>
//                     </div>

//                     <button
//                         onClick={handleExportCSV}
//                         disabled={filteredAlerts.length === 0}
//                         className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filteredAlerts.length > 0
//                                 ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer'
//                                 : 'bg-gray-50 text-gray-400 cursor-not-allowed'
//                             }`}
//                     >
//                         <Download className="w-3.5 h-3.5" />
//                         <span>Export CSV</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Alert List */}
//             <div className="space-y-3 min-h-[320px]">
//                 {currentAlerts.length > 0 ? (
//                     currentAlerts.map(alert => (
//                         <div key={alert.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors">
//                             <div className="flex justify-between items-start mb-2">
//                                 <div className="flex items-center space-x-2">
//                                     <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
//                                     <span className="text-xs font-bold text-gray-800">{alert.source}</span>
//                                 </div>
//                                 <div className="flex items-center text-[10px] text-gray-400 font-bold">
//                                     <Clock className="w-3 h-3 mr-1" />
//                                     {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </div>
//                             </div>

//                             <div className="flex items-start space-x-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm mt-2">
//                                 <ArrowRight className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <div>
//                                     <span className="text-[11px] text-slate-600 font-bold">
//                                         {getResolutionReason(alert.source)}
//                                     </span>
//                                     <p className="text-[9px] text-slate-400 uppercase mt-0.5">#{alert.id} • AI Verified</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="flex items-center justify-center h-full pt-10 text-xs font-bold text-gray-400">
//                         No auto-closed alerts in this timeframe.
//                     </div>
//                 )}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//                 <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
//                     <span className="text-[10px] text-slate-400 font-bold">
//                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAlerts.length)} of {filteredAlerts.length}
//                     </span>
//                     <div className="flex space-x-1">
//                         <button
//                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                             disabled={currentPage === 1}
//                             className={`p-1 rounded-md transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
//                         >
//                             <ChevronLeft className="w-4 h-4" />
//                         </button>
//                         <button
//                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                             disabled={currentPage === totalPages}
//                             className={`p-1 rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
//                         >
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AutoClosedPanel;

// import React from 'react';
// import { ShieldCheck, Download, Filter, ArrowRight } from 'lucide-react';

// const AutoClosedPanel = ({ alerts }) => {
//     // Filter only auto-closed alerts
//     const autoClosedAlerts = alerts.filter(a => a.status === 'AUTO-CLOSED');

//     return (
//         // MAGIC 1: Fixed height de di taaki jump na kare
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[450px]">

//             {/* Header */}
//             <div className="p-5 border-b border-gray-100 shrink-0">
//                 <div className="flex justify-between items-center mb-3">
//                     <div>
//                         <h3 className="text-lg font-bold text-gray-800">Auto-Closed Log</h3>
//                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">System Transparency</p>
//                     </div>
//                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
//                         <ShieldCheck className="w-5 h-5" />
//                     </div>
//                 </div>

//                 <div className="flex justify-between items-center gap-2">
//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 flex-1">
//                         <Filter className="w-3 h-3 text-gray-400 mr-1" />
//                         <select className="bg-transparent p-1.5 text-[11px] font-bold text-gray-600 outline-none w-full cursor-pointer">
//                             <option>All Time</option>
//                             <option>Today</option>
//                             <option>This Week</option>
//                         </select>
//                     </div>
//                     <button className="flex items-center space-x-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
//                         <Download className="w-3 h-3" />
//                         <span>Export CSV</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Log List - MAGIC 2: overflow-y-auto isko scrollable banayega, height same rahegi */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
//                 {autoClosedAlerts.map((alert) => (
//                     <div key={alert.id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
//                         <div className="flex justify-between items-center mb-2">
//                             <div className="flex items-center text-xs font-bold text-gray-700">
//                                 <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
//                                 {alert.source}
//                             </div>
//                             <div className="text-[10px] font-medium text-gray-500">
//                                 {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                             </div>
//                         </div>

//                         <div className="flex items-start bg-gray-50 p-2 rounded-lg mt-2">
//                             <ArrowRight className="w-3 h-3 text-green-500 mt-0.5 mr-1.5 shrink-0" />
//                             <div>
//                                 <p className="text-[11px] font-bold text-gray-700">System auto-reconciled</p>
//                                 <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">#{alert.id} • AI VERIFIED</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {autoClosedAlerts.length === 0 && (
//                     <div className="text-center py-10 text-gray-500 text-sm font-medium">
//                         No auto-closed alerts found.
//                     </div>
//                 )}
//             </div>

//             {/* Footer */}
//             <div className="px-5 py-3 border-t border-gray-100 bg-white shrink-0">
//                 <span className="text-[10px] text-gray-500 font-bold">
//                     Showing {Math.min(4, autoClosedAlerts.length)} of {autoClosedAlerts.length}
//                 </span>
//             </div>

//         </div>
//     );
// };

// export default AutoClosedPanel;

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Download, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const AutoClosedPanel = ({ alerts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Har page par 3 items dikhayenge taaki height balance rahe

    const autoClosedAlerts = alerts.filter(a => a.status === 'AUTO-CLOSED');

    // Agar naya data aaye, toh wapas page 1 par chale jao
    useEffect(() => {
        setCurrentPage(1);
    }, [alerts]);

    const totalPages = Math.ceil(autoClosedAlerts.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlerts = autoClosedAlerts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1 w-full h-full min-h-[350px]">

            {/* Header */}
            <div className="p-5 border-b border-gray-100 shrink-0">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Auto-Closed Log</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">System Transparency</p>
                    </div>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center border rounded-lg px-2 bg-gray-50 flex-1">
                        <Filter className="w-3 h-3 text-gray-400 mr-1" />
                        <select className="bg-transparent p-1.5 text-[11px] font-bold text-gray-600 outline-none w-full cursor-pointer">
                            <option>All Time</option>
                            <option>Today</option>
                            <option>This Week</option>
                        </select>
                    </div>
                    <button className="flex items-center space-x-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                        <Download className="w-3 h-3" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Paginated List Content */}
            <div className="flex-1 p-4 flex flex-col gap-3 bg-slate-50/50">
                {currentAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center text-xs font-bold text-gray-700">
                                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                {alert.source}
                            </div>
                            <div className="text-[10px] font-medium text-gray-500">
                                {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <div className="flex items-start bg-gray-50 p-2 rounded-lg mt-2">
                            <ArrowRight className="w-3 h-3 text-green-500 mt-0.5 mr-1.5 shrink-0" />
                            <div>
                                <p className="text-[11px] font-bold text-gray-700">System auto-reconciled</p>
                                <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">#{alert.id} • AI VERIFIED</p>
                            </div>
                        </div>
                    </div>
                ))}

                {currentAlerts.length === 0 && (
                    <div className="text-center py-10 text-gray-500 text-sm font-medium m-auto">
                        No auto-closed alerts found.
                    </div>
                )}
            </div>

            {/* Pagination Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-white shrink-0 mt-auto flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold">
                    Showing {currentAlerts.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, autoClosedAlerts.length)}
                </span>
                <div className="flex space-x-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-1 rounded-md transition-colors ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-1 rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AutoClosedPanel;