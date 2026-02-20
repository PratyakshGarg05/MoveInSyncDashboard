import React, { useState, useEffect } from 'react';
import { AlertCircle, ShieldAlert, Clock, Hourglass, RefreshCw } from 'lucide-react';
import SummaryCard from '../components/common/SummaryCard';
import Analytics from '../components/Dashboard/Analytics'; // YAHAN WAPAS IMPORT KIYA
import AlertTable from '../components/Dashboard/AlertTable';
import Leaderboard from '../components/Dashboard/Leaderboard';
import AlertModal from '../components/Dashboard/AlertModal';
import { mockAlerts } from '../data/mockAlerts';
import DriverAlertsModal from '../components/Dashboard/DriverAlertsModal';

const Dashboard = () => {
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);

    const [alerts, setAlerts] = useState(() => {
        const savedData = localStorage.getItem('moveinsync_alerts');
        return savedData ? JSON.parse(savedData) : mockAlerts;
    });

    useEffect(() => {
        localStorage.setItem('moveinsync_alerts', JSON.stringify(alerts));
    }, [alerts]);

    const handleResolveAlert = (alertId) => {
        setAlerts(alerts.map(alert =>
            alert.id === alertId ? { ...alert, status: 'RESOLVED' } : alert
        ));
        setSelectedAlert(null);
    };

    const handleResetData = () => {
        localStorage.removeItem('moveinsync_alerts');
        setAlerts(mockAlerts);
    };

    const stats = [
        {
            title: 'Total Open',
            count: alerts.filter(a => a.status === 'OPEN').length,
            icon: AlertCircle, color: 'bg-blue-500'
        },
        {
            title: 'Escalated (Critical)',
            count: alerts.filter(a => a.status === 'ESCALATED').length,
            icon: ShieldAlert, color: 'bg-red-500'
        },
        {
            title: 'Auto-Closed (Today)',
            count: alerts.filter(a => a.status === 'AUTO-CLOSED').length,
            icon: Clock, color: 'bg-gray-500'
        },
        {
            title: 'Pending Resolution',
            // Open + Escalated = Pending
            count: alerts.filter(a => a.status === 'OPEN' || a.status === 'ESCALATED').length,
            icon: Hourglass, color: 'bg-amber-500'
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen relative">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Command Center</h1>
                    <p className="text-gray-500 text-sm">Real-time fleet alert monitoring</p>
                </div>
                <button
                    onClick={handleResetData}
                    className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Test Data</span>
                </button>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <SummaryCard
                        key={index}
                        title={stat.title}
                        count={stat.count}
                        icon={stat.icon}
                        colorClass={stat.color}
                    />
                ))}
            </div>

            {/* NAYA: CHARTS WAPAS YAHAN ADD KAR DIYE */}
            <Analytics alerts={alerts} />

            {/* Main Table and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Severity Breakdown</h3>
                        <div className="h-4 w-full flex rounded-full overflow-hidden bg-gray-100">
                            <div className="bg-red-500 h-full" style={{ width: '30%' }} title="Critical"></div>
                            <div className="bg-amber-500 h-full" style={{ width: '45%' }} title="Warning"></div>
                            <div className="bg-blue-500 h-full" style={{ width: '25%' }} title="Info"></div>
                        </div>
                        <div className="flex space-x-6 mt-4 text-xs font-medium">
                            <span className="flex items-center text-red-600"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Critical (30%)</span>
                            <span className="flex items-center text-amber-600"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span> Warning (45%)</span>
                            <span className="flex items-center text-blue-600"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Info (25%)</span>
                        </div>
                    </div>

                    <AlertTable
                        alerts={alerts}
                        onViewDetails={(alert) => setSelectedAlert(alert)}
                    />
                </div>

                <div className="lg:col-span-1">
                    <Leaderboard
                        alerts={alerts}
                        onDriverClick={(driverName) => setSelectedDriver(driverName)}
                    />
                </div>
            </div>

            {selectedAlert && (
                <AlertModal
                    alert={selectedAlert}
                    onClose={() => setSelectedAlert(null)}
                    onResolve={handleResolveAlert}
                />
            )}

            {selectedDriver && (
                <DriverAlertsModal
                    driverName={selectedDriver}
                    alerts={alerts}
                    onClose={() => setSelectedDriver(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;