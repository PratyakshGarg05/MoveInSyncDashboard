import React from 'react';
import { User, ChevronRight } from 'lucide-react';

// NAYA: onDriverClick prop add kiya
const Leaderboard = ({ alerts = [], onDriverClick }) => {

    const getTopOffenders = () => {
        const activeAlerts = alerts.filter(a => a.status === 'OPEN' || a.status === 'ESCALATED');
        const driverMap = {};
        activeAlerts.forEach(alert => {
            if (!driverMap[alert.driver]) {
                driverMap[alert.driver] = {
                    name: alert.driver,
                    vehicle: alert.vehicleId,
                    count: 0,
                    type: alert.source
                };
            }
            driverMap[alert.driver].count += 1;
            driverMap[alert.driver].type = alert.source;
        });
        return Object.values(driverMap).sort((a, b) => b.count - a.count).slice(0, 5);
    };

    const topDrivers = getTopOffenders();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Offenders Leaderboard</h3>

            {topDrivers.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-sm font-medium">No active offenders right now.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {topDrivers.map((driver, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gray-100 p-2 rounded-full">
                                    <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{driver.name}</p>
                                    <p className="text-xs text-gray-500">{driver.vehicle} • {driver.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                    {driver.count} Alerts
                                </span>
                                {/* NAYA: Yahan ab alert() ki jagah proper function call hoga */}
                                <button
                                    onClick={() => onDriverClick(driver.name)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
                Scroll to Alert Feed
            </button>
        </div>
    );
};

export default Leaderboard;