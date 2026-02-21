// import React, { useState, useEffect } from 'react';
// import { AlertCircle, ShieldAlert, Clock, Hourglass, RefreshCw } from 'lucide-react';
// import SummaryCard from '../components/common/SummaryCard';
// import Analytics from '../components/Dashboard/Analytics'; // YAHAN WAPAS IMPORT KIYA
// import AlertTable from '../components/Dashboard/AlertTable';
// import Leaderboard from '../components/Dashboard/Leaderboard';
// import AlertModal from '../components/Dashboard/AlertModal';
// import { mockAlerts } from '../data/mockAlerts';
// import DriverAlertsModal from '../components/Dashboard/DriverAlertsModal';
// import AutoClosedPanel from "../components/Dashboard/AutoClosedPanel";
// import TrendChart from "../components/Dashboard/TrendChart";

// const Dashboard = () => {
//     const [selectedAlert, setSelectedAlert] = useState(null);
//     const [selectedDriver, setSelectedDriver] = useState(null);

//     const [alerts, setAlerts] = useState(() => {
//         const savedData = localStorage.getItem('moveinsync_alerts');
//         return savedData ? JSON.parse(savedData) : mockAlerts;
//     });

//     useEffect(() => {
//         localStorage.setItem('moveinsync_alerts', JSON.stringify(alerts));
//     }, [alerts]);

//     useEffect(() => {
//         // Ye interval har 10 second mein "Live Sync" ko simulate karega
//         const interval = setInterval(() => {
//             console.log("Polling for new alerts...");
//             // Asli project mein yahan API call hoti
//             // Hum yahan sirf ye check kar rahe hain ki UI responsive rahe
//         }, 10000);

//         return () => clearInterval(interval);
//     }, []);

//     const handleResolveAlert = (alertId) => {
//         setAlerts(alerts.map(alert =>
//             alert.id === alertId ? { ...alert, status: 'RESOLVED' } : alert
//         ));
//         setSelectedAlert(null);
//     };

//     const handleResetData = () => {
//         localStorage.removeItem('moveinsync_alerts');
//         setAlerts(mockAlerts);
//     };

//     const stats = [
//         {
//             title: 'Total Open',
//             count: alerts.filter(a => a.status === 'OPEN').length,
//             icon: AlertCircle, color: 'bg-blue-500'
//         },
//         {
//             title: 'Escalated (Critical)',
//             count: alerts.filter(a => a.status === 'ESCALATED').length,
//             icon: ShieldAlert, color: 'bg-red-500'
//         },
//         {
//             title: 'Auto-Closed (Today)',
//             count: alerts.filter(a => a.status === 'AUTO-CLOSED').length,
//             icon: Clock, color: 'bg-gray-500'
//         },
//         {
//             title: 'Pending Resolution',
//             // Open + Escalated = Pending
//             count: alerts.filter(a => a.status === 'OPEN' || a.status === 'ESCALATED').length,
//             icon: Hourglass, color: 'bg-amber-500'
//         },
//     ];

//     return (
//         <div className="p-8 bg-gray-50 min-h-screen relative">
//             <header className="mb-8 flex justify-between items-center">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800">Command Center</h1>
//                     <p className="text-gray-500 text-sm">Real-time fleet alert monitoring</p>
//                 </div>
//                 <button
//                     onClick={handleResetData}
//                     className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
//                 >
//                     <RefreshCw className="w-4 h-4" />
//                     <span>Reset Test Data</span>
//                 </button>
//             </header>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {stats.map((stat, index) => (
//                     <SummaryCard
//                         key={index}
//                         title={stat.title}
//                         count={stat.count}
//                         icon={stat.icon}
//                         colorClass={stat.color}
//                     />
//                 ))}
//             </div>

//             {/* NAYA: CHARTS WAPAS YAHAN ADD KAR DIYE */}
//             <TrendChart alerts={alerts} />
//             <Analytics alerts={alerts} />

//             {/* Main Table and Leaderboard */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//                 <div className="lg:col-span-2">
//                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
//                         <h3 className="text-sm font-semibold text-gray-700 mb-4">Severity Breakdown</h3>
//                         <div className="h-4 w-full flex rounded-full overflow-hidden bg-gray-100">
//                             <div className="bg-red-500 h-full" style={{ width: '30%' }} title="Critical"></div>
//                             <div className="bg-amber-500 h-full" style={{ width: '45%' }} title="Warning"></div>
//                             <div className="bg-blue-500 h-full" style={{ width: '25%' }} title="Info"></div>
//                         </div>
//                         <div className="flex space-x-6 mt-4 text-xs font-medium">
//                             <span className="flex items-center text-red-600"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Critical (30%)</span>
//                             <span className="flex items-center text-amber-600"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span> Warning (45%)</span>
//                             <span className="flex items-center text-blue-600"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Info (25%)</span>
//                         </div>
//                     </div>

//                     <AlertTable
//                         alerts={alerts}
//                         onViewDetails={(alert) => setSelectedAlert(alert)}
//                     />
//                 </div>

//                 <div className="lg:col-span-1">
//                     <Leaderboard
//                         alerts={alerts}
//                         onDriverClick={(driverName) => setSelectedDriver(driverName)}
//                     />
//                     <AutoClosedPanel alerts={alerts} />
//                 </div>
//             </div>

//             {selectedAlert && (
//                 <AlertModal
//                     alert={selectedAlert}
//                     onClose={() => setSelectedAlert(null)}
//                     onResolve={handleResolveAlert}
//                 />
//             )}

//             {selectedDriver && (
//                 <DriverAlertsModal
//                     driverName={selectedDriver}
//                     alerts={alerts}
//                     onClose={() => setSelectedDriver(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { mockAlerts } from '../data/mockAlerts';
// import { AlertCircle, ShieldAlert, Clock, Hourglass } from 'lucide-react';

// import Analytics from '../components/Dashboard/Analytics';
// import TrendChart from '../components/Dashboard/TrendChart';
// import AlertTable from '../components/Dashboard/AlertTable';
// import Leaderboard from '../components/Dashboard/Leaderboard';
// import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
// import AlertModal from '../components/Dashboard/AlertModal';

// const Dashboard = () => {
//   const [selectedAlert, setSelectedAlert] = useState(null);
//   const [alertsData, setAlertsData] = useState(mockAlerts);

//   // --- FILTERS STATE (Lekin dikhenge Table ke andar) ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterSeverity, setFilterSeverity] = useState('ALL');
//   const [filterStatus, setFilterStatus] = useState('ALL');
//   const [filterSource, setFilterSource] = useState('ALL');
//   const [timeFilter, setTimeFilter] = useState('ALL'); 
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const sourceTypes = [...new Set(mockAlerts.map(a => a.source))];

//   // --- FILTERING LOGIC ---
//   const filteredAlerts = alertsData.filter(alert => {
//     const searchLower = searchTerm.toLowerCase();
//     const displayId = `#${alert.id}`.toLowerCase();
//     const matchesSearch = alert.driver.toLowerCase().includes(searchLower) || 
//                          displayId.includes(searchLower) || 
//                          alert.id.toLowerCase().includes(searchLower);

//     const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
//     const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
//     const matchesSource = filterSource === 'ALL' || alert.source === filterSource;

//     const alertDateObj = new Date(alert.timestamp);
//     const alertTime = alertDateObj.getTime();
//     let matchesDate = true;

//     if (timeFilter === '24H') {
//       matchesDate = (Date.now() - alertTime) <= 24 * 60 * 60 * 1000;
//     } else if (timeFilter === '7D') {
//       matchesDate = (Date.now() - alertTime) <= 7 * 24 * 60 * 60 * 1000;
//     } else if (timeFilter === 'CUSTOM' || dateRange.start || dateRange.end) {
//       alertDateObj.setHours(0, 0, 0, 0); 
//       if (dateRange.start) {
//         const startDate = new Date(dateRange.start);
//         startDate.setHours(0, 0, 0, 0);
//         if (alertDateObj < startDate) matchesDate = false;
//       }
//       if (dateRange.end) {
//         const endDate = new Date(dateRange.end);
//         endDate.setHours(0, 0, 0, 0);
//         if (alertDateObj > endDate) matchesDate = false;
//       }
//     }

//     return matchesSearch && matchesStatus && matchesSeverity && matchesSource && matchesDate;
//   });

//   const handleResolveAlert = (id) => {
//     setAlertsData(prevAlerts => 
//       prevAlerts.map(alert => 
//         alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
//       )
//     );
//     setSelectedAlert(null); 
//   };

//   // Top Stats calculation based on FILTERED data
//   const openAlerts = filteredAlerts.filter(a => a.status === 'OPEN').length;
//   const escalatedAlerts = filteredAlerts.filter(a => a.status === 'ESCALATED').length;
//   const autoClosedAlerts = filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length;
//   const pendingAlerts = filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-6">

//         <header className="mb-6">
//           <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
//           <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
//         </header>

//         {/* TOP SUMMARY CARDS (Wapas apni jagah par) */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Total Open</p>
//               <h3 className="text-2xl font-black text-gray-800">{openAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p>
//               <h3 className="text-2xl font-black text-gray-800">{escalatedAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Auto-Closed</p>
//               <h3 className="text-2xl font-black text-gray-800">{autoClosedAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Pending Resolution</p>
//               <h3 className="text-2xl font-black text-gray-800">{pendingAlerts}</h3>
//             </div>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-12 gap-6">
//           <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
//             <TrendChart alerts={filteredAlerts} />
//             <Analytics alerts={filteredAlerts} />

//             {/* Table jisme ab hum Setters bhej rahe hain */}
//             <AlertTable 
//               alerts={filteredAlerts} 
//               onViewDetails={setSelectedAlert} 
//               searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//               filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity}
//               filterStatus={filterStatus} setFilterStatus={setFilterStatus}
//               filterSource={filterSource} setFilterSource={setFilterSource}
//               timeFilter={timeFilter} setTimeFilter={setTimeFilter}
//               dateRange={dateRange} setDateRange={setDateRange}
//               sourceTypes={sourceTypes}
//             />
//           </div>

//           <div className="col-span-12 lg:col-span-4 space-y-6">
//             <Leaderboard alerts={filteredAlerts} />
//             <AutoClosedPanel alerts={filteredAlerts} />
//           </div>
//         </div>

//         {selectedAlert && (
//           <AlertModal 
//             alert={selectedAlert} 
//             onClose={() => setSelectedAlert(null)} 
//             onResolve={handleResolveAlert} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { mockAlerts } from '../data/mockAlerts';
// import { AlertCircle, ShieldAlert, Clock, Hourglass } from 'lucide-react';

// import Analytics from '../components/Dashboard/Analytics';
// import TrendChart from '../components/Dashboard/TrendChart';
// import AlertTable from '../components/Dashboard/AlertTable';
// import Leaderboard from '../components/Dashboard/Leaderboard';
// import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
// import AlertModal from '../components/Dashboard/AlertModal';


// const Dashboard = () => {
//   const [selectedAlert, setSelectedAlert] = useState(null);
//   const [alertsData, setAlertsData] = useState(mockAlerts);

//   // --- FILTERS STATE (Dikhenge Table ke andar) ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterSeverity, setFilterSeverity] = useState('ALL');
//   const [filterStatus, setFilterStatus] = useState('ALL');
//   const [filterSource, setFilterSource] = useState('ALL');
//   const [timeFilter, setTimeFilter] = useState('ALL'); 
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   const sourceTypes = [...new Set(mockAlerts.map(a => a.source))];

//   // --- FILTERING LOGIC ---
//   const filteredAlerts = alertsData.filter(alert => {
//     const searchLower = searchTerm.toLowerCase();
//     const displayId = `#${alert.id}`.toLowerCase();
//     const matchesSearch = alert.driver.toLowerCase().includes(searchLower) || 
//                          displayId.includes(searchLower) || 
//                          alert.id.toLowerCase().includes(searchLower);

//     const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
//     const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
//     const matchesSource = filterSource === 'ALL' || alert.source === filterSource;

//     const alertDateObj = new Date(alert.timestamp);
//     const alertTime = alertDateObj.getTime();
//     let matchesDate = true;

//     if (timeFilter === '24H') {
//       matchesDate = (Date.now() - alertTime) <= 24 * 60 * 60 * 1000;
//     } else if (timeFilter === '7D') {
//       matchesDate = (Date.now() - alertTime) <= 7 * 24 * 60 * 60 * 1000;
//     } else if (timeFilter === 'CUSTOM' || dateRange.start || dateRange.end) {
//       alertDateObj.setHours(0, 0, 0, 0); 
//       if (dateRange.start) {
//         const startDate = new Date(dateRange.start);
//         startDate.setHours(0, 0, 0, 0);
//         if (alertDateObj < startDate) matchesDate = false;
//       }
//       if (dateRange.end) {
//         const endDate = new Date(dateRange.end);
//         endDate.setHours(0, 0, 0, 0);
//         if (alertDateObj > endDate) matchesDate = false;
//       }
//     }

//     return matchesSearch && matchesStatus && matchesSeverity && matchesSource && matchesDate;
//   });

//   const handleResolveAlert = (id) => {
//     setAlertsData(prevAlerts => 
//       prevAlerts.map(alert => 
//         alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
//       )
//     );
//     setSelectedAlert(null); 
//   };

//   const openAlerts = filteredAlerts.filter(a => a.status === 'OPEN').length;
//   const escalatedAlerts = filteredAlerts.filter(a => a.status === 'ESCALATED').length;
//   const autoClosedAlerts = filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length;
//   const pendingAlerts = filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-6">

//         <header className="mb-6">
//           <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
//           <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
//         </header>

//         {/* TOP SUMMARY CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Total Open</p>
//               <h3 className="text-2xl font-black text-gray-800">{openAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p>
//               <h3 className="text-2xl font-black text-gray-800">{escalatedAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Auto-Closed</p>
//               <h3 className="text-2xl font-black text-gray-800">{autoClosedAlerts}</h3>
//             </div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//             <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6"/></div>
//             <div>
//               <p className="text-xs text-gray-500 font-bold">Pending Resolution</p>
//               <h3 className="text-2xl font-black text-gray-800">{pendingAlerts}</h3>
//             </div>
//           </div>
//         </div>

//         {/* --- NAYA: CHARTS KO FULL WIDTH DE DIYA --- */}
//         <div className="flex flex-col gap-6">
//           <TrendChart alerts={filteredAlerts} />
//           <Analytics alerts={filteredAlerts} />
//         </div>

//         {/* --- PURANA LAYOUT: LEFT MEIN TABLE, RIGHT MEIN LEADERBOARD --- */}
//         <div className="grid grid-cols-12 gap-6 mt-2">

//           <div className="col-span-12 lg:col-span-8">
//             <AlertTable 
//               alerts={filteredAlerts} 
//               onViewDetails={setSelectedAlert} 
//               searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//               filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity}
//               filterStatus={filterStatus} setFilterStatus={setFilterStatus}
//               filterSource={filterSource} setFilterSource={setFilterSource}
//               timeFilter={timeFilter} setTimeFilter={setTimeFilter}
//               dateRange={dateRange} setDateRange={setDateRange}
//               sourceTypes={sourceTypes}
//             />
//           </div>

//           <div className="col-span-12 lg:col-span-4 space-y-6">
//             <Leaderboard alerts={filteredAlerts} />
//             <AutoClosedPanel alerts={filteredAlerts} />
//           </div>

//         </div>

//         {selectedAlert && (
//           <AlertModal 
//             alert={selectedAlert} 
//             onClose={() => setSelectedAlert(null)} 
//             onResolve={handleResolveAlert} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { AlertCircle, ShieldAlert, Clock, Hourglass } from 'lucide-react';

// import Analytics from '../components/Dashboard/Analytics';
// import TrendChart from '../components/Dashboard/TrendChart';
// import AlertTable from '../components/Dashboard/AlertTable';
// import Leaderboard from '../components/Dashboard/Leaderboard';
// import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
// import AlertModal from '../components/Dashboard/AlertModal';

// // NAYA: Context import kar liya
// import { useAlerts } from '../context/AlertContext';

// const Dashboard = () => {
//     const [selectedAlert, setSelectedAlert] = useState(null);

//     // NAYA: Local state hata kar Context se data utha liya
//     const { alertsData, setAlertsData } = useAlerts();

//     // --- FILTERS STATE (Dikhenge Table ke andar) ---
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterSeverity, setFilterSeverity] = useState('ALL');
//     const [filterStatus, setFilterStatus] = useState('ALL');
//     const [filterSource, setFilterSource] = useState('ALL');
//     const [timeFilter, setTimeFilter] = useState('ALL');
//     const [dateRange, setDateRange] = useState({ start: '', end: '' });

//     // NAYA: mockAlerts ki jagah ab alertsData se sources banenge
//     const sourceTypes = [...new Set(alertsData.map(a => a.source))];

//     // --- FILTERING LOGIC ---
//     const filteredAlerts = alertsData.filter(alert => {
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

//     const handleResolveAlert = (id) => {
//         setAlertsData(prevAlerts =>
//             prevAlerts.map(alert =>
//                 alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
//             )
//         );
//         setSelectedAlert(null);
//     };

//     const openAlerts = filteredAlerts.filter(a => a.status === 'OPEN').length;
//     const escalatedAlerts = filteredAlerts.filter(a => a.status === 'ESCALATED').length;
//     const autoClosedAlerts = filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length;
//     const pendingAlerts = filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length;

//     return (
//         <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
//             <div className="max-w-7xl mx-auto space-y-6">

//                 <header className="mb-6">
//                     <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
//                     <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
//                 </header>

//                 {/* TOP SUMMARY CARDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Total Open</p>
//                             <h3 className="text-2xl font-black text-gray-800">{openAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p>
//                             <h3 className="text-2xl font-black text-gray-800">{escalatedAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Auto-Closed</p>
//                             <h3 className="text-2xl font-black text-gray-800">{autoClosedAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Pending Resolution</p>
//                             <h3 className="text-2xl font-black text-gray-800">{pendingAlerts}</h3>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- NAYA: CHARTS KO FULL WIDTH DE DIYA --- */}
//                 <div className="flex flex-col gap-6">
//                     <TrendChart alerts={filteredAlerts} />
//                     <Analytics alerts={filteredAlerts} />
//                 </div>

//                 {/* --- PURANA LAYOUT: LEFT MEIN TABLE, RIGHT MEIN LEADERBOARD --- */}
//                 <div className="grid grid-cols-12 gap-6 mt-2">

//                     <div className="col-span-12 lg:col-span-8">
//                         <AlertTable
//                             alerts={filteredAlerts}
//                             onViewDetails={setSelectedAlert}
//                             searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                             filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity}
//                             filterStatus={filterStatus} setFilterStatus={setFilterStatus}
//                             filterSource={filterSource} setFilterSource={setFilterSource}
//                             timeFilter={timeFilter} setTimeFilter={setTimeFilter}
//                             dateRange={dateRange} setDateRange={setDateRange}
//                             sourceTypes={sourceTypes}
//                         />
//                     </div>

//                     <div className="col-span-12 lg:col-span-4 space-y-6">
//                         <Leaderboard alerts={filteredAlerts} />
//                         <AutoClosedPanel alerts={filteredAlerts} />
//                     </div>

//                 </div>

//                 {selectedAlert && (
//                     <AlertModal
//                         alert={selectedAlert}
//                         onClose={() => setSelectedAlert(null)}
//                         onResolve={handleResolveAlert}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { AlertCircle, ShieldAlert, Clock, Hourglass } from 'lucide-react';

// import Analytics from '../components/Dashboard/Analytics';
// import TrendChart from '../components/Dashboard/TrendChart';
// import AlertTable from '../components/Dashboard/AlertTable';
// import Leaderboard from '../components/Dashboard/Leaderboard';
// import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
// import AlertModal from '../components/Dashboard/AlertModal';

// import { useAlerts } from '../context/AlertContext';

// const Dashboard = () => {
//     const [selectedAlert, setSelectedAlert] = useState(null);
//     const { alertsData, setAlertsData } = useAlerts();

//     // --- FILTERS STATE ---
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterSeverity, setFilterSeverity] = useState('ALL');
//     const [filterStatus, setFilterStatus] = useState('ALL');
//     const [filterSource, setFilterSource] = useState('ALL');
//     const [timeFilter, setTimeFilter] = useState('ALL');
//     const [dateRange, setDateRange] = useState({ start: '', end: '' });

//     const sourceTypes = [...new Set(alertsData.map(a => a.source))];

//     // --- FILTERING LOGIC ---
//     const filteredAlerts = alertsData.filter(alert => {
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

//     const handleResolveAlert = (id) => {
//         setAlertsData(prevAlerts =>
//             prevAlerts.map(alert =>
//                 alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
//             )
//         );
//         setSelectedAlert(null);
//     };

//     const openAlerts = filteredAlerts.filter(a => a.status === 'OPEN').length;
//     const escalatedAlerts = filteredAlerts.filter(a => a.status === 'ESCALATED').length;
//     const autoClosedAlerts = filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length;
//     const pendingAlerts = filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length;

//     return (
//         <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
//             <div className="max-w-7xl mx-auto space-y-6">

//                 <header className="mb-6">
//                     <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
//                     <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
//                 </header>

//                 {/* TOP SUMMARY CARDS */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Total Open</p>
//                             <h3 className="text-2xl font-black text-gray-800">{openAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p>
//                             <h3 className="text-2xl font-black text-gray-800">{escalatedAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Auto-Closed</p>
//                             <h3 className="text-2xl font-black text-gray-800">{autoClosedAlerts}</h3>
//                         </div>
//                     </div>
//                     <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
//                         <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6" /></div>
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold">Pending Resolution</p>
//                             <h3 className="text-2xl font-black text-gray-800">{pendingAlerts}</h3>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-6">
//                     <TrendChart alerts={filteredAlerts} />
//                     <Analytics alerts={filteredAlerts} />
//                 </div>

//                 <div className="grid grid-cols-12 gap-6 mt-2">

//                     <div className="col-span-12 lg:col-span-8">
//                         <AlertTable
//                             alerts={filteredAlerts}
//                             onViewDetails={setSelectedAlert}
//                             searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                             filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity}
//                             filterStatus={filterStatus} setFilterStatus={setFilterStatus}
//                             filterSource={filterSource} setFilterSource={setFilterSource}
//                             timeFilter={timeFilter} setTimeFilter={setTimeFilter}
//                             dateRange={dateRange} setDateRange={setDateRange}
//                             sourceTypes={sourceTypes}
//                         />
//                     </div>

//                     <div className="col-span-12 lg:col-span-4 space-y-6">
//                         {/* YAHAN MAGIC HAI: onViewDetails pass kar diya */}
//                         <Leaderboard alerts={filteredAlerts} onViewDetails={setSelectedAlert} />

//                         <AutoClosedPanel alerts={filteredAlerts} />
//                     </div>

//                 </div>

//                 {selectedAlert && (
//                     <AlertModal
//                         alert={selectedAlert}
//                         onClose={() => setSelectedAlert(null)}
//                         onResolve={handleResolveAlert}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, Clock, Hourglass } from 'lucide-react';

import Analytics from '../components/Dashboard/Analytics';
import TrendChart from '../components/Dashboard/TrendChart';
import AlertTable from '../components/Dashboard/AlertTable';
import Leaderboard from '../components/Dashboard/Leaderboard';
import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
import AlertModal from '../components/Dashboard/AlertModal';

import { useAlerts } from '../context/AlertContext';

const Dashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const { alertsData, setAlertsData } = useAlerts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSource, setFilterSource] = useState('ALL');
  const [timeFilter, setTimeFilter] = useState('ALL'); 
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const sourceTypes = [...new Set(alertsData.map(a => a.source))];

  const filteredAlerts = alertsData.filter(alert => {
    const searchLower = searchTerm.toLowerCase();
    const displayId = `#${alert.id}`.toLowerCase();
    const matchesSearch = alert.driver.toLowerCase().includes(searchLower) || 
                         displayId.includes(searchLower) || 
                         alert.id.toLowerCase().includes(searchLower);

    const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
    const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
    const matchesSource = filterSource === 'ALL' || alert.source === filterSource;
    
    const alertDateObj = new Date(alert.timestamp);
    const alertTime = alertDateObj.getTime();
    let matchesDate = true;
    
    if (timeFilter === '24H') {
      matchesDate = (Date.now() - alertTime) <= 24 * 60 * 60 * 1000;
    } else if (timeFilter === '7D') {
      matchesDate = (Date.now() - alertTime) <= 7 * 24 * 60 * 60 * 1000;
    } else if (timeFilter === 'CUSTOM' || dateRange.start || dateRange.end) {
      alertDateObj.setHours(0, 0, 0, 0); 
      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        startDate.setHours(0, 0, 0, 0);
        if (alertDateObj < startDate) matchesDate = false;
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        endDate.setHours(0, 0, 0, 0);
        if (alertDateObj > endDate) matchesDate = false;
      }
    }

    return matchesSearch && matchesStatus && matchesSeverity && matchesSource && matchesDate;
  });

  const handleResolveAlert = (id) => {
    setAlertsData(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
      )
    );
    setSelectedAlert(null); 
  };

  const openAlerts = filteredAlerts.filter(a => a.status === 'OPEN').length;
  const escalatedAlerts = filteredAlerts.filter(a => a.status === 'ESCALATED').length;
  const autoClosedAlerts = filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length;
  const pendingAlerts = filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="mb-6">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Total Open</p>
              <h3 className="text-2xl font-black text-gray-800">{openAlerts}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p>
              <h3 className="text-2xl font-black text-gray-800">{escalatedAlerts}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Auto-Closed</p>
              <h3 className="text-2xl font-black text-gray-800">{autoClosedAlerts}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Pending Resolution</p>
              <h3 className="text-2xl font-black text-gray-800">{pendingAlerts}</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <TrendChart alerts={filteredAlerts} />
          <Analytics alerts={filteredAlerts} />
        </div>

        {/* YAHAN MAGIC HAI: items-stretch lagaya */}
        <div className="grid grid-cols-12 gap-6 mt-2 items-stretch">
          
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <div className="flex-1 flex flex-col">
              <AlertTable 
                alerts={filteredAlerts} 
                onViewDetails={setSelectedAlert} 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity}
                filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                filterSource={filterSource} setFilterSource={setFilterSource}
                timeFilter={timeFilter} setTimeFilter={setTimeFilter}
                dateRange={dateRange} setDateRange={setDateRange}
                sourceTypes={sourceTypes}
              />
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="shrink-0">
              <Leaderboard alerts={filteredAlerts} onViewDetails={setSelectedAlert} />
            </div>
            <div className="flex-1 flex flex-col min-h-[300px]">
              <AutoClosedPanel alerts={filteredAlerts} />
            </div>
          </div>
          
        </div>

        {selectedAlert && (
          <AlertModal 
            alert={selectedAlert} 
            onClose={() => setSelectedAlert(null)} 
            onResolve={handleResolveAlert} 
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;