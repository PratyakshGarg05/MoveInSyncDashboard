import React, { useState, useEffect } from 'react';
import { ShieldCheck, Download, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const AutoClosedPanel = ({ alerts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // exactly 3 items on every page

    const autoClosedAlerts = alerts.filter(a => a.status === 'AUTO-CLOSED');

    useEffect(() => {
        setCurrentPage(1);
    }, [alerts]);

    const totalPages = Math.ceil(autoClosedAlerts.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlerts = autoClosedAlerts.slice(startIndex, startIndex + itemsPerPage);

    const emptyItems = itemsPerPage - currentAlerts.length;

    // CSV EXPORT 
    const handleExportCSV = () => {
        if (autoClosedAlerts.length === 0) {
            alert("No data to export!");
            return;
        }

        const headers = ['Alert ID', 'Source', 'Severity', 'Status', 'Timestamp', 'Vehicle ID', 'Driver'];

        const csvRows = [
            headers.join(','),
            ...autoClosedAlerts.map(alert => [
                alert.id,
                `"${alert.source}"`,
                alert.severity,
                alert.status,
                `"${new Date(alert.timestamp).toLocaleString()}"`,
                alert.vehicleId,
                `"${alert.driver}"`
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', `AutoClosed_Alerts_${new Date().toISOString().split('T')[0]}.csv`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center space-x-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                        <Download className="w-3 h-3" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Paginated List Content */}
            <div className="flex-1 p-4 flex flex-col gap-3 bg-slate-50/50">
                {currentAlerts.length > 0 ? (
                    <>
                        {currentAlerts.map((alert) => (
                            <div key={alert.id} className="h-[96px] bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors flex flex-col justify-center">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center text-xs font-bold text-gray-700">
                                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                        {alert.source}
                                    </div>
                                    <div className="text-[10px] font-medium text-gray-500">
                                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="flex items-start bg-gray-50 p-2 rounded-lg mt-1">
                                    <ArrowRight className="w-3 h-3 text-green-500 mt-0.5 mr-1.5 shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-700">System auto-reconciled</p>
                                        <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">#{alert.id} • AI VERIFIED</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* INVISIBLE CARDS: for anti jump */}
                        {emptyItems > 0 && Array.from({ length: emptyItems }).map((_, index) => (
                            <div key={`empty-card-${index}`} className="h-[96px] opacity-0 pointer-events-none" aria-hidden="true"></div>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500 text-sm font-medium m-auto h-[312px] flex items-center justify-center">
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

export default React.memo(AutoClosedPanel);