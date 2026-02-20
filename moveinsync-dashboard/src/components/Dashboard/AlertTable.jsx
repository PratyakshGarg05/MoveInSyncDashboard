import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';

const AlertTable = ({ alerts, onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // NAYA: Filtering States
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterSeverity, setFilterSeverity] = useState('ALL');

    // NAYA: Sorting State
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Jab bhi filter, search ya sort change ho, toh wapas Page 1 par aa jayein
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus, filterSeverity, sortConfig]);

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

    // NAYA: Sorting function
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // NAYA: Icon dikhane ka logic
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400 inline" />;
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="w-3 h-3 ml-1 text-blue-600 inline" />
            : <ArrowDown className="w-3 h-3 ml-1 text-blue-600 inline" />;
    };

    // NAYA: Search, Filter aur Sort ka combined math
    let processedAlerts = alerts.filter(alert => {
        // 1. Search Logic
        const searchLower = searchTerm.toLowerCase();
        const displayId = `#${alert.id}`.toLowerCase();
        const matchesSearch = alert.driver.toLowerCase().includes(searchLower) || displayId.includes(searchLower) || alert.id.toLowerCase().includes(searchLower);

        // 2. Filter Logic
        const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
        const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;

        return matchesSearch && matchesStatus && matchesSeverity;
    });

    // 3. Sort Logic
    if (sortConfig.key) {
        processedAlerts.sort((a, b) => {
            // Custom logic taaki 'Critical' upar aaye aur 'Info' niche agar Severity sort ho
            if (sortConfig.key === 'severity') {
                const ranks = { 'Critical': 3, 'Warning': 2, 'Info': 1 };
                return sortConfig.direction === 'asc' ? ranks[a.severity] - ranks[b.severity] : ranks[b.severity] - ranks[a.severity];
            }

            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // Pagination Logic
    const totalPages = Math.ceil(processedAlerts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlerts = processedAlerts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
            {/* Table Header Controls (Search & Filters) */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0">
                <h3 className="text-lg font-bold text-gray-800">Alert Feed</h3>

                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
                    {/* Severity Filter */}
                    <div className="flex items-center border rounded-lg px-2 bg-gray-50">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={filterSeverity}
                            onChange={(e) => setFilterSeverity(e.target.value)}
                            className="px-2 py-2 text-sm bg-transparent focus:outline-none text-gray-700 font-medium"
                        >
                            <option value="ALL">All Severities</option>
                            <option value="Critical">Critical</option>
                            <option value="Warning">Warning</option>
                            <option value="Info">Info</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center border rounded-lg px-2 bg-gray-50">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-2 py-2 text-sm bg-transparent focus:outline-none text-gray-700 font-medium"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="OPEN">Open</option>
                            <option value="ESCALATED">Escalated</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="AUTO-CLOSED">Auto-Closed</option>
                        </select>
                    </div>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search driver or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-48"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <th onClick={() => handleSort('id')} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                                Alert ID {getSortIcon('id')}
                            </th>
                            <th onClick={() => handleSort('source')} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                                Source {getSortIcon('source')}
                            </th>
                            <th onClick={() => handleSort('severity')} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                                Severity {getSortIcon('severity')}
                            </th>
                            <th onClick={() => handleSort('status')} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                                Status {getSortIcon('status')}
                            </th>
                            <th onClick={() => handleSort('driver')} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                                Driver {getSortIcon('driver')}
                            </th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentAlerts.length > 0 ? (
                            currentAlerts.map((alert) => (
                                <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">#{alert.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{alert.source}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={getSeverityColor(alert.severity)}>{alert.severity}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                                            {alert.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-medium text-gray-900">{alert.driver}</div>
                                        <div className="text-gray-500 text-xs">{alert.vehicleId}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onViewDetails(alert)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-lg font-medium text-gray-700">No alerts match your criteria</span>
                                        <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                    <span className="text-sm text-gray-600">
                        Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(startIndex + itemsPerPage, processedAlerts.length)}</span> of <span className="font-bold">{processedAlerts.length}</span> alerts
                    </span>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertTable;