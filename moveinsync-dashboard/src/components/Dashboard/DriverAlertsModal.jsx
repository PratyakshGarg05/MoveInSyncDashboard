import React from 'react';
import { X } from 'lucide-react';

const DriverAlertsModal = ({ driverName, alerts, onClose }) => {
    // Sirf us specific driver ke alerts nikaaliye
    const driverAlerts = alerts.filter(a => a.driver === driverName);

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-blue-100 text-blue-800';
            case 'ESCALATED': return 'bg-red-100 text-red-800';
            case 'AUTO-CLOSED': return 'bg-gray-100 text-gray-800';
            case 'RESOLVED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{driverName}'s Alert History</h2>
                        <p className="text-sm text-gray-500">Showing all associated alerts for this driver</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body (Scrollable List) */}
                <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                    <div className="space-y-4">
                        {driverAlerts.map(alert => (
                            <div key={alert.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-blue-600">#{alert.id}</span>
                                        <span className="text-sm font-bold text-gray-800">{alert.source}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Vehicle: {alert.vehicleId} • {new Date(alert.timestamp).toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(alert.status)}`}>
                                        {alert.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverAlertsModal;