import React from 'react';
import { X, ShieldAlert, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const DriverAlertsModal = ({ driver, alerts, onClose }) => {
    const sortedAlerts = [...alerts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]" role="dialog" aria-modal="true" aria-labelledby="modal-title">

                {/* Header  */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                    <div>
                        <h3 id="modal-title" className="text-lg font-bold text-gray-800 flex items-center">
                            <span className="mr-2">{driver.name}'s Alert History</span>
                            <span className="bg-red-100 text-red-700 py-0.5 px-2.5 rounded-full text-[10px] font-black">{alerts.length} ALERTS</span>
                        </h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Vehicle ID: {driver.vehicle}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:bg-gray-200 hover:text-gray-600 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>

                {/* Scrollable Alerts List */}
                <div className="overflow-y-auto p-6 flex-1 bg-slate-50/50 space-y-3">
                    {sortedAlerts.map(alert => (
                        <div key={alert.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-sm font-black text-blue-600">#{alert.id}</span>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusColor(alert.status)}`}>{alert.status}</span>
                                </div>
                                <div className="text-sm font-bold text-gray-800 flex items-center">
                                    {alert.severity === 'Critical' && <AlertTriangle className="w-4 h-4 text-red-500 mr-1.5" />}
                                    {alert.severity === 'Warning' && <ShieldAlert className="w-4 h-4 text-amber-500 mr-1.5" />}
                                    {alert.severity === 'Info' && <CheckCircle className="w-4 h-4 text-blue-500 mr-1.5" />}
                                    {alert.source}
                                </div>
                                <div className="text-[11px] text-gray-500 font-bold mt-1.5 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(alert.timestamp).toLocaleString()}
                                </div>
                            </div>
                            <div className="text-right sm:text-right text-left">
                                <span className={`text-xs font-black uppercase tracking-wider ${alert.severity === 'Critical' ? 'text-red-600' : alert.severity === 'Warning' ? 'text-amber-600' : 'text-blue-600'}`}>
                                    {alert.severity} SEVERITY
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white shrink-0 flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriverAlertsModal;