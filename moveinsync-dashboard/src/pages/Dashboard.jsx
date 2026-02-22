import React, { useState, useMemo, useCallback } from 'react';
import { AlertCircle, ShieldAlert, Clock, Hourglass, RefreshCcw, WifiOff } from 'lucide-react';

import Analytics from '../components/Dashboard/Analytics';
import TrendChart from '../components/Dashboard/TrendChart';
import AlertTable from '../components/Dashboard/AlertTable';
import Leaderboard from '../components/Dashboard/Leaderboard';
import AutoClosedPanel from '../components/Dashboard/AutoClosedPanel';
import AlertModal from '../components/Dashboard/AlertModal';
import DriverAlertsModal from '../components/Dashboard/DriverAlertsModal';

import { useAlerts } from '../context/AlertContext';

const DashboardSkeleton = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>)}
        </div>
        <div className="flex flex-col gap-6 mt-6">
            <div className="h-[300px] w-full bg-gray-200 rounded-xl"></div>
            <div className="h-[250px] w-full bg-gray-200 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-8 h-[600px] bg-gray-200 rounded-xl"></div>
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="h-[300px] bg-gray-200 rounded-xl"></div>
                <div className="h-[300px] bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [selectedDriverProfile, setSelectedDriverProfile] = useState(null);

    const { alertsData, setAlertsData, rules, isLoading, error } = useAlerts();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterSeverity, setFilterSeverity] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterSource, setFilterSource] = useState('ALL');
    const [timeFilter, setTimeFilter] = useState('ALL');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const sourceTypes = useMemo(() => [...new Set(alertsData.map(a => a.source))], [alertsData]);

    const ruleSourceMap = useMemo(() => ({
        'Overspeeding Limit': 'Overspeeding',
        'Idle Time Maximum': 'Idle Time Exceeded',
        'Route Deviation': 'Route Deviation',
        'Hard Braking': 'Hard Braking'
    }), []);

    const filteredAlerts = useMemo(() => {
        const managedSources = Object.values(ruleSourceMap);
        const activeRulesBySource = {};

        (rules || []).forEach(r => {
            if (r.active) activeRulesBySource[ruleSourceMap[r.name]] = r;
        });

        const dynamicAlerts = alertsData.map(alert => {
            const rule = activeRulesBySource[alert.source];

            if (managedSources.includes(alert.source)) {
                if (!rule) return null;

                const alertNum = parseInt(alert.id.replace(/\D/g, '')) || 0;
                const fakeScore = (alertNum * 17) % 100;

                if (fakeScore < rule.threshold) return null;

                let dynamicStatus = alert.status;
                if (dynamicStatus !== 'RESOLVED') {
                    if (rule.action === 'Auto-Close Route') dynamicStatus = 'AUTO-CLOSED';
                    else if (rule.action === 'Escalate to Manager') dynamicStatus = 'ESCALATED';
                    else if (rule.action === 'Alert Driver') dynamicStatus = 'OPEN';
                }

                return { ...alert, status: dynamicStatus };
            }

            return alert;
        }).filter(Boolean);

        return dynamicAlerts.filter(alert => {
            const searchLower = searchTerm.toLowerCase();
            const displayId = `#${alert.id}`.toLowerCase();
            const matchesSearch = alert.driver.toLowerCase().includes(searchLower) ||
                displayId.includes(searchLower) ||
                alert.id.toLowerCase().includes(searchLower);

            const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
            const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
            const matchesSource = filterSource === 'ALL' || alert.source === filterSource;

            let matchesDate = true;
            const alertTime = new Date(alert.timestamp).getTime();

            if (timeFilter === '24H') matchesDate = (Date.now() - alertTime) <= 24 * 60 * 60 * 1000;
            else if (timeFilter === '7D') matchesDate = (Date.now() - alertTime) <= 7 * 24 * 60 * 60 * 1000;

            return matchesSearch && matchesStatus && matchesSeverity && matchesSource && matchesDate;
        });
    }, [alertsData, rules, searchTerm, filterStatus, filterSeverity, filterSource, timeFilter, ruleSourceMap]);

    const handleResolveAlert = useCallback((id) => {
        setAlertsData(prevAlerts =>
            prevAlerts.map(alert => alert.id === id ? { ...alert, status: 'RESOLVED' } : alert)
        );
        setSelectedAlert(null);
    }, [setAlertsData]);

    const metrics = useMemo(() => ({
        open: filteredAlerts.filter(a => a.status === 'OPEN').length,
        escalated: filteredAlerts.filter(a => a.status === 'ESCALATED').length,
        autoClosed: filteredAlerts.filter(a => a.status === 'AUTO-CLOSED').length,
        pending: filteredAlerts.filter(a => a.status !== 'RESOLVED' && a.status !== 'AUTO-CLOSED').length
    }), [filteredAlerts]);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-screen-2xl mx-auto space-y-6 w-full">
                {error ? (
                    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                        <div className="p-4 bg-red-100 rounded-full text-red-500 mb-4"><WifiOff className="w-12 h-12" /></div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">Network Error</h2>
                        <p className="text-gray-500 font-medium max-w-md mb-6">{error}</p>
                        <button onClick={() => window.location.reload()} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                            <RefreshCcw className="w-5 h-5" /><span>Retry Connection</span>
                        </button>
                    </div>
                ) : isLoading ? (
                    <DashboardSkeleton />
                ) : (
                    <>
                        <header className="mb-6">
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
                            <p className="text-sm font-bold text-gray-500 mt-1">Real-time fleet alert monitoring</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><AlertCircle className="w-6 h-6" /></div>
                                <div><p className="text-xs text-gray-500 font-bold">Total Open</p><h3 className="text-2xl font-black text-gray-800">{metrics.open}</h3></div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                                <div className="p-3 bg-red-50 text-red-500 rounded-lg"><ShieldAlert className="w-6 h-6" /></div>
                                <div><p className="text-xs text-gray-500 font-bold">Escalated (Critical)</p><h3 className="text-2xl font-black text-gray-800">{metrics.escalated}</h3></div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                                <div className="p-3 bg-slate-50 text-slate-500 rounded-lg"><Clock className="w-6 h-6" /></div>
                                <div><p className="text-xs text-gray-500 font-bold">Auto-Closed</p><h3 className="text-2xl font-black text-gray-800">{metrics.autoClosed}</h3></div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                                <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><Hourglass className="w-6 h-6" /></div>
                                <div><p className="text-xs text-gray-500 font-bold">Pending Resolution</p><h3 className="text-2xl font-black text-gray-800">{metrics.pending}</h3></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 mb-6">
                            <TrendChart alerts={filteredAlerts} />
                            <Analytics alerts={filteredAlerts} />
                        </div>

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
                                <div className="shrink-0"><Leaderboard alerts={filteredAlerts} onDriverClick={setSelectedDriverProfile} /></div>
                                <div className="flex-1 flex flex-col min-h-[300px]"><AutoClosedPanel alerts={filteredAlerts} /></div>
                            </div>
                        </div>

                        {selectedAlert && <AlertModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} onResolve={handleResolveAlert} />}
                        {selectedDriverProfile && <DriverAlertsModal driver={selectedDriverProfile} alerts={selectedDriverProfile.allAlerts} onClose={() => setSelectedDriverProfile(null)} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;