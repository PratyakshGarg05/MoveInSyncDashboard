import React from 'react';
import { X, ShieldAlert, User, MapPin } from 'lucide-react';
import StateTimeline from './StateTimeline';

const AlertModal = ({ alert, onClose, onResolve }) => {
    if (!alert) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Alert #{alert.id}</h2>
                        <p className="text-sm text-gray-500">{alert.source} • {alert.timestamp}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Metadata Card */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center"><User className="w-4 h-4 mr-2" /> Entity Details</h3>
                            <p className="text-sm"><span className="text-gray-500">Driver:</span> <span className="font-medium text-gray-900">{alert.driver}</span></p>
                            <p className="text-sm mt-2"><span className="text-gray-500">Vehicle:</span> <span className="font-medium text-gray-900">{alert.vehicleId}</span></p>
                        </div>

                        {/* Specific Alert Info */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> Rule Triggered</h3>
                            <div className="space-y-2">
                                {Object.entries(alert.metadata).map(([key, value]) => (
                                    <p key={key} className="text-sm capitalize">
                                        <span className="text-gray-500">{key}:</span> <span className="font-medium text-gray-900">{value}</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Integration */}
                    <StateTimeline status={alert.status} />
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-4 rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    {alert.status !== 'RESOLVED' && alert.status !== 'AUTO-CLOSED' && (
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to mark this alert as resolved?")) {
                                    onResolve(alert.id);
                                }
                            }}
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm"
                        >
                            Mark as Resolved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertModal;