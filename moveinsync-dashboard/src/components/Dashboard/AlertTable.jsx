// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, Calendar, Clock } from 'lucide-react';

// const AlertTable = ({ alerts, onViewDetails }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterStatus, setFilterStatus] = useState('ALL');
//     const [filterSeverity, setFilterSeverity] = useState('ALL');
//     const [filterSource, setFilterSource] = useState('ALL');
//     const [timeFilter, setTimeFilter] = useState('ALL');
//     const [dateRange, setDateRange] = useState({ start: '', end: '' });

//     const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
//     const [currentPage, setCurrentPage] = useState(1);

//     const itemsPerPage = 8;

//     const sourceTypes = [...new Set(alerts.map(a => a.source))];

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchTerm, filterStatus, filterSeverity, filterSource, timeFilter, dateRange, sortConfig]);

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'OPEN': return 'bg-blue-100 text-blue-800';
//             case 'ESCALATED': return 'bg-red-100 text-red-800';
//             case 'AUTO-CLOSED': return 'bg-gray-100 text-gray-800';
//             case 'RESOLVED': return 'bg-green-100 text-green-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const getSeverityColor = (severity) => {
//         switch (severity) {
//             case 'Critical': return 'text-red-600 font-bold';
//             case 'Warning': return 'text-amber-600 font-semibold';
//             case 'Info': return 'text-blue-600';
//             default: return 'text-gray-600';
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const getSortIcon = (key) => {
//         if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400 inline" />;
//         return sortConfig.direction === 'asc'
//             ? <ArrowUp className="w-3 h-3 ml-1 text-blue-600 inline" />
//             : <ArrowDown className="w-3 h-3 ml-1 text-blue-600 inline" />;
//     };

//     // Logic: Search + Filters + Time Logic
//     let processedAlerts = alerts.filter(alert => {
//         const searchLower = searchTerm.toLowerCase();
//         const displayId = `#${alert.id}`.toLowerCase();
//         const matchesSearch = alert.driver.toLowerCase().includes(searchLower) ||
//             displayId.includes(searchLower) ||
//             alert.id.toLowerCase().includes(searchLower);

//         const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
//         const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
//         const matchesSource = filterSource === 'ALL' || alert.source === filterSource;

//         const alertDateObj = new Date(alert.timestamp);
//         const alertTime = alertDateObj.getTime();

//         let matchesDate = true;

//         if (timeFilter === '24H') {
//             matchesDate = (Date.now() - alertTime) <= 24 * 60 * 60 * 1000;
//         } else if (timeFilter === '7D') {
//             matchesDate = (Date.now() - alertTime) <= 7 * 24 * 60 * 60 * 1000;
//         } else if (timeFilter === 'CUSTOM' || dateRange.start || dateRange.end) {
//             alertDateObj.setHours(0, 0, 0, 0);
//             if (dateRange.start) {
//                 const startDate = new Date(dateRange.start);
//                 startDate.setHours(0, 0, 0, 0);
//                 if (alertDateObj < startDate) matchesDate = false;
//             }
//             if (dateRange.end) {
//                 const endDate = new Date(dateRange.end);
//                 endDate.setHours(0, 0, 0, 0);
//                 if (alertDateObj > endDate) matchesDate = false;
//             }
//         }

//         return matchesSearch && matchesStatus && matchesSeverity && matchesSource && matchesDate;
//     });

//     if (sortConfig.key) {
//         processedAlerts.sort((a, b) => {
//             let aVal = a[sortConfig.key];
//             let bVal = b[sortConfig.key];
//             if (sortConfig.key === 'severity') {
//                 const ranks = { 'Critical': 3, 'Warning': 2, 'Info': 1 };
//                 aVal = ranks[a.severity];
//                 bVal = ranks[b.severity];
//             }
//             if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//             return 0;
//         });
//     }

//     const totalPages = Math.ceil(processedAlerts.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentAlerts = processedAlerts.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
//             {/* Filters Header Section */}
//             <div className="p-6 border-b border-gray-100 space-y-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <h3 className="text-lg font-bold text-gray-800">Alert Feed</h3>
//                     <input
//                         type="text"
//                         placeholder="Search driver or ID..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                     />
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3">
//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
//                         <Filter className="w-4 h-4 text-gray-400 mr-1" />
//                         <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//                             <option value="ALL">All Severities</option>
//                             <option value="Critical">Critical</option>
//                             <option value="Warning">Warning</option>
//                             <option value="Info">Info</option>
//                         </select>
//                     </div>

//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
//                         <Filter className="w-4 h-4 text-gray-400 mr-1" />
//                         <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//                             <option value="ALL">All Statuses</option>
//                             {['OPEN', 'ESCALATED', 'RESOLVED', 'AUTO-CLOSED'].map(s => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                     </div>

//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
//                         <Filter className="w-4 h-4 text-gray-400 mr-1" />
//                         <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//                             <option value="ALL">All Sources</option>
//                             {sourceTypes.map(type => <option key={type} value={type}>{type}</option>)}
//                         </select>
//                     </div>

//                     {/* Quick Time Dropdown */}
//                     <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
//                         <Clock className="w-4 h-4 text-gray-400 mr-1" />
//                         <select
//                             value={timeFilter}
//                             onChange={(e) => {
//                                 setTimeFilter(e.target.value);
//                                 // Agar user 24H ya 7D choose kare, toh custom dates clear kar do
//                                 if (e.target.value !== 'CUSTOM') {
//                                     setDateRange({ start: '', end: '' });
//                                 }
//                             }}
//                             className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer"
//                         >
//                             <option value="ALL">All Time</option>
//                             <option value="24H">Last 24 Hours</option>
//                             <option value="7D">Last 7 Days</option>
//                             <option value="CUSTOM">Custom Dates</option>
//                         </select>
//                     </div>

//                     {/* Date Picker - AB HAMESHA VISIBLE RAHEGA */}
//                     <div className={`flex items-center border rounded-lg px-3 py-1 space-x-2 min-w-[260px] transition-all duration-300 ${timeFilter === 'CUSTOM' || dateRange.start ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50'}`}>
//                         <Calendar className={`w-4 h-4 ${timeFilter === 'CUSTOM' || dateRange.start ? 'text-blue-500' : 'text-gray-400'}`} />
//                         <input
//                             type="date"
//                             value={dateRange.start}
//                             onChange={(e) => {
//                                 setDateRange({ ...dateRange, start: e.target.value });
//                                 setTimeFilter('CUSTOM'); // Date change karte hi dropdown auto-update hoga
//                             }}
//                             className="bg-transparent text-[11px] outline-none cursor-pointer"
//                         />
//                         <span className="text-gray-400 text-xs font-medium">to</span>
//                         <input
//                             type="date"
//                             value={dateRange.end}
//                             onChange={(e) => {
//                                 setDateRange({ ...dateRange, end: e.target.value });
//                                 setTimeFilter('CUSTOM'); // Date change karte hi dropdown auto-update hoga
//                             }}
//                             className="bg-transparent text-[11px] outline-none cursor-pointer"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="overflow-x-auto min-h-[450px]">
//                 <table className="w-full text-left border-collapse">
//                     <thead>
//                         <tr className="bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-bold">
//                             {['id', 'source', 'severity', 'status', 'timestamp', 'driver'].map(col => (
//                                 <th key={col} onClick={() => handleSort(col)} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
//                                     {col === 'id' ? 'Alert ID' : col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                         {currentAlerts.length > 0 ? (
//                             currentAlerts.map((alert) => (
//                                 <tr
//                                     key={alert.id}
//                                     onClick={() => onViewDetails(alert)}
//                                     className="hover:bg-blue-50 cursor-pointer transition-colors group"
//                                 >
//                                     <td className="px-6 py-4 text-sm font-medium text-blue-600">#{alert.id}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-700">{alert.source}</td>
//                                     <td className="px-6 py-4 text-sm">
//                                         <span className={getSeverityColor(alert.severity)}>{alert.severity}</span>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm">
//                                         <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(alert.status)}`}>
//                                             {alert.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 text-xs text-gray-500 font-medium leading-tight">
//                                         {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         <br />
//                                         <span className="text-[10px] text-gray-400">{new Date(alert.timestamp).toLocaleDateString()}</span>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm">
//                                         <div className="font-bold text-gray-800">{alert.driver}</div>
//                                         <div className="text-gray-500 text-[10px]">{alert.vehicleId}</div>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-sm font-medium">No matching alerts found for selected filters.</td></tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {totalPages > 1 && (
//                 <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
//                     <span className="text-xs text-gray-600">
//                         Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(startIndex + itemsPerPage, processedAlerts.length)}</span> of <span className="font-bold">{processedAlerts.length}</span> alerts
//                     </span>
//                     <div className="flex space-x-1">
//                         <button onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }} disabled={currentPage === 1} className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}><ChevronLeft className="w-4 h-4" /></button>
//                         {[...Array(totalPages)].map((_, index) => {
//                             if (totalPages > 7 && (index + 1 !== 1 && index + 1 !== totalPages && Math.abs(currentPage - (index + 1)) > 1)) {
//                                 if (index + 1 === 2 || index + 1 === totalPages - 1) return <span key={index} className="px-1 text-gray-400">...</span>;
//                                 return null;
//                             }
//                             return (
//                                 <button key={index + 1} onClick={(e) => { e.stopPropagation(); setCurrentPage(index + 1); }} className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>
//                             );
//                         })}
//                         <button onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }} disabled={currentPage === totalPages} className={`p-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}><ChevronRight className="w-4 h-4" /></button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AlertTable;

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, Calendar, Clock, Search } from 'lucide-react';

// const AlertTable = ({ 
//   alerts, onViewDetails,
//   // Ye saare states ab Dashboard se aa rahe hain
//   searchTerm, setSearchTerm,
//   filterSeverity, setFilterSeverity,
//   filterStatus, setFilterStatus,
//   filterSource, setFilterSource,
//   timeFilter, setTimeFilter,
//   dateRange, setDateRange,
//   sourceTypes
// }) => {
//   const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8; 

//   // Jab bhi filters change honge aur naya data aayega, page 1 par chale jao
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [alerts]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'OPEN': return 'bg-blue-100 text-blue-800';
//       case 'ESCALATED': return 'bg-red-100 text-red-800';
//       case 'AUTO-CLOSED': return 'bg-gray-100 text-gray-800';
//       case 'RESOLVED': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'Critical': return 'text-red-600 font-bold';
//       case 'Warning': return 'text-amber-600 font-semibold';
//       case 'Info': return 'text-blue-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400 inline" />;
//     return sortConfig.direction === 'asc' 
//       ? <ArrowUp className="w-3 h-3 ml-1 text-blue-600 inline" /> 
//       : <ArrowDown className="w-3 h-3 ml-1 text-blue-600 inline" />;
//   };

//   // Yahan sirf Sorting ho rahi hai, Filtering Dashboard ne already kar di hai
//   let processedAlerts = [...alerts];
//   if (sortConfig.key) {
//     processedAlerts.sort((a, b) => {
//       let aVal = a[sortConfig.key];
//       let bVal = b[sortConfig.key];
//       if (sortConfig.key === 'severity') {
//         const ranks = { 'Critical': 3, 'Warning': 2, 'Info': 1 };
//         aVal = ranks[a.severity];
//         bVal = ranks[b.severity];
//       }
//       if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   const totalPages = Math.ceil(processedAlerts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentAlerts = processedAlerts.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
//       {/* FILTERS WAPAS APNI JAGAH PAR */}
//       <div className="p-6 border-b border-gray-100 space-y-4">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h3 className="text-lg font-bold text-gray-800">Alert Feed</h3>
//           <div className="relative w-full sm:w-64">
//             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <input 
//               type="text" 
//               placeholder="Search driver or ID..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//             />
//           </div>
//         </div>
        
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
//             <Filter className="w-4 h-4 text-gray-400 mr-1" />
//             <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//               <option value="ALL">All Severities</option>
//               <option value="Critical">Critical</option>
//               <option value="Warning">Warning</option>
//               <option value="Info">Info</option>
//             </select>
//           </div>

//           <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
//             <Filter className="w-4 h-4 text-gray-400 mr-1" />
//             <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//               <option value="ALL">All Statuses</option>
//               {['OPEN', 'ESCALATED', 'RESOLVED', 'AUTO-CLOSED'].map(s => <option key={s} value={s}>{s}</option>)}
//             </select>
//           </div>

//           <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
//             <Filter className="w-4 h-4 text-gray-400 mr-1" />
//             <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
//               <option value="ALL">All Sources</option>
//               {sourceTypes.map(type => <option key={type} value={type}>{type}</option>)}
//             </select>
//           </div>

//           <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
//             <Clock className="w-4 h-4 text-gray-400 mr-1" />
//             <select 
//               value={timeFilter} 
//               onChange={(e) => {
//                 setTimeFilter(e.target.value);
//                 if(e.target.value !== 'CUSTOM') setDateRange({ start: '', end: '' });
//               }} 
//               className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer"
//             >
//               <option value="ALL">All Time</option>
//               <option value="24H">Last 24 Hours</option>
//               <option value="7D">Last 7 Days</option>
//               <option value="CUSTOM">Custom Dates</option>
//             </select>
//           </div>

//           <div className={`flex items-center border rounded-lg px-3 py-1 space-x-2 min-w-[260px] transition-all duration-300 ${timeFilter === 'CUSTOM' || dateRange.start ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50'}`}>
//             <Calendar className={`w-4 h-4 ${timeFilter === 'CUSTOM' || dateRange.start ? 'text-blue-500' : 'text-gray-400'}`} />
//             <input type="date" value={dateRange.start} onChange={(e) => { setDateRange({...dateRange, start: e.target.value}); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
//             <span className="text-gray-400 text-xs font-medium">to</span>
//             <input type="date" value={dateRange.end} onChange={(e) => { setDateRange({...dateRange, end: e.target.value}); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
//           </div>
//         </div>
//       </div>
//       {/* ----------------------------------- */}

//       <div className="overflow-x-auto min-h-[450px]">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-bold">
//               {['id', 'source', 'severity', 'status', 'timestamp', 'driver'].map(col => (
//                 <th key={col} onClick={() => handleSort(col)} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
//                   {col === 'id' ? 'Alert ID' : col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {currentAlerts.length > 0 ? (
//               currentAlerts.map((alert) => (
//                 <tr key={alert.id} onClick={() => onViewDetails(alert)} className="hover:bg-blue-50 cursor-pointer transition-colors group">
//                   <td className="px-6 py-4 text-sm font-medium text-blue-600">#{alert.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{alert.source}</td>
//                   <td className="px-6 py-4 text-sm"><span className={getSeverityColor(alert.severity)}>{alert.severity}</span></td>
//                   <td className="px-6 py-4 text-sm"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(alert.status)}`}>{alert.status}</span></td>
//                   <td className="px-6 py-4 text-xs text-gray-500 font-medium leading-tight">
//                     {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
//                     <span className="text-[10px] text-gray-400">{new Date(alert.timestamp).toLocaleDateString()}</span>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <div className="font-bold text-gray-800">{alert.driver}</div>
//                     <div className="text-gray-500 text-[10px]">{alert.vehicleId}</div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-sm font-bold">No alerts match the selected filters.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
//           <span className="text-xs text-gray-600 font-bold">
//             Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, processedAlerts.length)} of {processedAlerts.length} alerts
//           </span>
//           <div className="flex space-x-1">
//             <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}><ChevronLeft className="w-4 h-4" /></button>
//             {[...Array(totalPages)].map((_, index) => {
//               if (totalPages > 7 && (index + 1 !== 1 && index + 1 !== totalPages && Math.abs(currentPage - (index + 1)) > 1)) {
//                  if (index + 1 === 2 || index + 1 === totalPages - 1) return <span key={index} className="px-1 text-gray-400">...</span>;
//                  return null;
//               }
//               return (
//                 <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>
//               );
//             })}
//             <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}><ChevronRight className="w-4 h-4" /></button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AlertTable;

import React, { useState, useEffect } from 'react';
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
  const itemsPerPage = 8; 

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
    if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400 inline" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 text-blue-600 inline" /> 
      : <ArrowDown className="w-3 h-3 ml-1 text-blue-600 inline" />;
  };

  let processedAlerts = [...alerts];
  if (sortConfig.key) {
    processedAlerts.sort((a, b) => {
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

  const totalPages = Math.ceil(processedAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = processedAlerts.slice(startIndex, startIndex + itemsPerPage);
  
  // MAGIC: Calculate how many empty rows we need to keep height perfectly stable
  const emptyRows = itemsPerPage - currentAlerts.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      
      {/* FILTERS HEADER */}
      <div className="p-6 border-b border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800">Alert Feed</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search driver or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
              <option value="ALL">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
          </div>

          <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[130px]">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
              <option value="ALL">All Statuses</option>
              {['OPEN', 'ESCALATED', 'RESOLVED', 'AUTO-CLOSED'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer">
              <option value="ALL">All Sources</option>
              {sourceTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="flex items-center border rounded-lg px-2 bg-gray-50 min-w-[140px]">
            <Clock className="w-4 h-4 text-gray-400 mr-1" />
            <select 
              value={timeFilter} 
              onChange={(e) => {
                setTimeFilter(e.target.value);
                if(e.target.value !== 'CUSTOM') setDateRange({ start: '', end: '' });
              }} 
              className="bg-transparent p-2 text-xs font-medium outline-none w-full cursor-pointer"
            >
              <option value="ALL">All Time</option>
              <option value="24H">Last 24 Hours</option>
              <option value="7D">Last 7 Days</option>
              <option value="CUSTOM">Custom Dates</option>
            </select>
          </div>

          <div className={`flex items-center border rounded-lg px-3 py-1 space-x-2 min-w-[260px] transition-all duration-300 ${timeFilter === 'CUSTOM' || dateRange.start ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50'}`}>
            <Calendar className={`w-4 h-4 ${timeFilter === 'CUSTOM' || dateRange.start ? 'text-blue-500' : 'text-gray-400'}`} />
            <input type="date" value={dateRange.start} onChange={(e) => { setDateRange({...dateRange, start: e.target.value}); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
            <span className="text-gray-400 text-xs font-medium">to</span>
            <input type="date" value={dateRange.end} onChange={(e) => { setDateRange({...dateRange, end: e.target.value}); setTimeFilter('CUSTOM'); }} className="bg-transparent text-[11px] outline-none cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-bold h-[48px]">
              {['id', 'source', 'severity', 'status', 'timestamp', 'driver'].map(col => (
                <th key={col} onClick={() => handleSort(col)} className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
                  {col === 'id' ? 'Alert ID' : col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentAlerts.length > 0 ? (
              <>
                {currentAlerts.map((alert) => (
                  <tr key={alert.id} onClick={() => onViewDetails && onViewDetails(alert)} className="hover:bg-blue-50 cursor-pointer transition-colors group h-[76px]">
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
                
                {/* YAHAN MAGIC HAI: Baki bachi hui jagah ko empty rows se fill kar diya taaki pagination button na hile */}
                {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
                  <tr key={`empty-${index}`} className="h-[76px] pointer-events-none">
                    <td colSpan="6"></td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="h-[608px]"> {/* 8 rows * 76px = 608px */}
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 text-sm font-bold align-middle">
                  No alerts match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer - Yeh ab apni jagah se kabhi nahi hilega! */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 mt-auto">
          <span className="text-xs text-gray-600 font-bold">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, processedAlerts.length)} of {processedAlerts.length} alerts
          </span>
          <div className="flex space-x-1">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors'}`}><ChevronLeft className="w-4 h-4" /></button>
            {[...Array(totalPages)].map((_, index) => {
              if (totalPages > 7 && (index + 1 !== 1 && index + 1 !== totalPages && Math.abs(currentPage - (index + 1)) > 1)) {
                 if (index + 1 === 2 || index + 1 === totalPages - 1) return <span key={index} className="px-1 text-gray-400">...</span>;
                 return null;
              }
              return (
                <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-all ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>
              );
            })}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors'}`}><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertTable;