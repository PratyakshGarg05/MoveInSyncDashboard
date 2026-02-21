import React from 'react';
import { User, ExternalLink } from 'lucide-react';

const Leaderboard = ({ alerts, onViewDetails }) => {
    // Group alerts by driver to find top offenders
    const driverStats = alerts.reduce((acc, alert) => {
        if (!acc[alert.driver]) {
            acc[alert.driver] = {
                id: alert.driver,
                name: alert.driver,
                vehicle: alert.vehicleId,
                alertCount: 0,
                latestAlert: alert // Store the full alert object
            };
        }
        acc[alert.driver].alertCount += 1;

        // Update latest alert if this one is newer
        if (new Date(alert.timestamp) > new Date(acc[alert.driver].latestAlert.timestamp)) {
            acc[alert.driver].latestAlert = alert;
        }
        return acc;
    }, {});

    const sortedDrivers = Object.values(driverStats)
        .sort((a, b) => b.alertCount - a.alertCount)
        .slice(0, 5); // Show Top 5

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Top Offenders Leaderboard</h3>
            </div>

            <div className="p-4 space-y-3">
                {sortedDrivers.map((driver) => (
                    <div
                        key={driver.id}
                        // YAHAN MAGIC HAI: Click karne par Modal open hoga latest alert ke sath
                        onClick={() => onViewDetails && onViewDetails(driver.latestAlert)}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm">
                                    <User className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{driver.name}</h4>
                                    <p className="text-[10px] text-gray-500 font-medium">{driver.vehicle}</p>
                                </div>
                            </div>
                            <div className="bg-red-50 text-red-600 px-2.5 py-1 rounded text-xs font-black">
                                {driver.alertCount} ALERTS
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200/60">
                            <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center">
                                <span className="mr-1">Latest:</span>
                                <span className="text-gray-800">{driver.latestAlert.source}</span>
                            </div>
                            <div className="text-blue-600 flex items-center text-[10px] font-bold group-hover:underline">
                                View Alert <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </div>
                ))}

                {sortedDrivers.length === 0 && (
                    <div className="text-center py-6 text-gray-500 text-sm font-medium">
                        No offenders found for current filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;