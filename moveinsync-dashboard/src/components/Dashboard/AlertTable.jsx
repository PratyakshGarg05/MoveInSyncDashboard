import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, Calendar, Clock, Search } from 'lucide-react';

const AlertTable = ({
    alerts, onViewDetails,
    searchTerm, setSearchTerm,
    filterSeverity, setFilterSeverity,
    filterStatus, setFilterStatus,
    filterSource, setFilterSource,
    timeFilter, setTimeFilter,
    dateRange, setDateRange,
    sourceTypes
}) => {
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [alerts]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-blue-100 text-blue-800';
            case 'ESCALATED': return 'bg-red-100 text-red-800';
            case 'AUTO-CLOSED': return 'bg-gray-100 text-gray-800';
            case 'RESOLVED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return 'text-red-600 font-bold';
            case 'Warning': return 'text-amber-600 font-semibold';
            case 'Info': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400 inline" aria-hidden="true" />;
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="w-3 h-3 ml-1 text-blue-600 inline" aria-hidden="true" />
            : <ArrowDown className="w-3 h-3 ml-1 text-blue-600 inline" aria-hidden="true" />;
    };

    const processedAlerts = useMemo(() => {
        let sorted = [...alerts];
        if (sortConfig.key) {
            sorted.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];
                if (sortConfig.key === 'severity') {
                    const ranks = { 'Critical': 3, 'Warning': 2, 'Info': 1 };
                    aVal = ranks[a.severity];
                    bVal = ranks[b.severity];
                }
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sorted;
    }, [alerts, sortConfig]);

    const totalPages = Math.ceil(processedAlerts.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlerts = processedAlerts.slice(startIndex, startIndex + itemsPerPage);
    const emptyRows = itemsPerPage - currentAlerts.length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col w-full h-full">
            <div className="p-6 border-b border-gray-100 space-y-4 shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Alert Feed</h3>
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search driver or ID..."
                            aria-label="Search alerts"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/*FILTERS! */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
                        <Filter className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
                        <select aria-label="Filter by Severity" value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="ALL">All Severities</option>
                            <option value="Critical">Critical</option>
                            <option value="Warning">Warning</option>
                            <option value="Info">Info</option>
                        </select>
                    </div>

                    <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
                        <Filter className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
                        <select aria-label="Filter by Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="ALL">All Statuses</option>
                            {['OPEN', 'ESCALATED', 'RESOLVED', 'AUTO-CLOSED'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
                        <Filter className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
                        <select aria-label="Filter by Source" value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="ALL">All Sources</option>
                            {sourceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
                        <select
                            aria-label="Filter by Time"
                            value={timeFilter}
                            onChange={(e) => {
                                setTimeFilter(e.target.value);
                                if (e.target.value !== 'CUSTOM') setDateRange({ start: '', end: '' });
                            }}
                            className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="ALL">All Time</option>
                            <option value="24H">Last 24 Hours</option>
                            <option value="7D">Last 7 Days</option>
                            <option value="CUSTOM">Custom Dates</option>
                        </select>
                    </div>

                    <div className={`flex items-center border rounded-lg px-3 py-1 space-x-2 min-w-[260px] transition-all duration-300 ${timeFilter === 'CUSTOM' || dateRange.start ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50'}`}>
                        <Calendar className={`w-4 h-4 ${timeFilter === 'CUSTOM' || dateRange.start ? 'text-blue-500' : 'text-gray-400'}`} aria-hidden="true" />
                        <input type="date" aria-label="Start Date" value={dateRange.start} onChange={(e) => { setDateRange({ ...dateRange, start: e.target.value }); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
                        <span className="text-gray-400 text-xs font-medium">to</span>
                        <input type="date" aria-label="End Date" value={dateRange.end} onChange={(e) => { setDateRange({ ...dateRange, end: e.target.value }); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse" role="grid" aria-label="Fleet Alerts">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-bold">
                            {['id', 'source', 'severity', 'status', 'timestamp', 'driver'].map(col => (
                                <th
                                    key={col}
                                    onClick={() => handleSort(col)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort(col); }}
                                    tabIndex={0}
                                    role="columnheader"
                                    aria-sort={sortConfig.key === col ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                                    className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                >
                                    {col === 'id' ? 'Alert ID' : col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentAlerts.length > 0 ? (
                            <>
                                {currentAlerts.map((alert) => (
                                    <tr
                                        key={alert.id}
                                        onClick={() => onViewDetails && onViewDetails(alert)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`View details for alert ${alert.id}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                onViewDetails && onViewDetails(alert);
                                            }
                                        }}
                                        className="hover:bg-blue-50 cursor-pointer transition-colors group h-[72px] focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">#{alert.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{alert.source}</td>
                                        <td className="px-6 py-4 text-sm"><span className={getSeverityColor(alert.severity)}>{alert.severity}</span></td>
                                        <td className="px-6 py-4 text-sm"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(alert.status)}`}>{alert.status}</span></td>
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium leading-tight">
                                            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
                                            <span className="text-[10px] text-gray-400">{new Date(alert.timestamp).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="font-bold text-gray-800">{alert.driver}</div>
                                            <div className="text-gray-500 text-[10px]">{alert.vehicleId}</div>
                                        </td>
                                    </tr>
                                ))}

                                {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
                                    <tr key={`empty-${index}`} className="h-[72px] border-transparent pointer-events-none" aria-hidden="true"><td colSpan="6"></td></tr>
                                ))}
                            </>
                        ) : (
                            <tr className="h-[648px]">
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-sm font-bold align-middle">No alerts match the selected filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 mt-auto shrink-0">
                <span className="text-xs text-gray-600 font-bold" aria-live="polite">
                    Showing {processedAlerts.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, processedAlerts.length)} of {processedAlerts.length} alerts
                </span>
                <nav className="flex space-x-1" aria-label="Pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className={`p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors'}`}
                    >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        if (totalPages > 7 && (index + 1 !== 1 && index + 1 !== totalPages && Math.abs(currentPage - (index + 1)) > 1)) {
                            if (index + 1 === 2 || index + 1 === totalPages - 1) return <span key={index} className="px-1 text-gray-400" aria-hidden="true">...</span>;
                            return null;
                        }
                        return (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                aria-label={`Page ${index + 1}`}
                                aria-current={currentPage === index + 1 ? "page" : undefined}
                                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className={`p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors'}`}
                    >
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default React.memo(AlertTable);