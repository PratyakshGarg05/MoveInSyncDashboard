import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const RuleModal = ({ rule, onClose, onSave }) => {
    // Form state
    const [threshold, setThreshold] = useState(rule.threshold || 1);
    const [timeWindow, setTimeWindow] = useState(rule.timeWindow || 60);
    const [action, setAction] = useState(rule.action || 'ESCALATE');
    const [error, setError] = useState('');

    const handleSave = () => {
        // Validation: Count threshold must be >= 1 
        if (threshold < 1) {
            setError('Threshold count must be at least 1.');
            return;
        }

        // Save data and close
        onSave({ ...rule, threshold, timeWindow, action });
    };

    if (!rule) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Edit Rule</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-1.5 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Alert Type</label>
                        <input type="text" value={rule.type} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm" />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Count Threshold</label>
                            <input
                                type="number"
                                min="1"
                                value={threshold}
                                onChange={(e) => { setThreshold(Number(e.target.value)); setError(''); }}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Time Window (mins)</label>
                            <select
                                value={timeWindow}
                                onChange={(e) => setTimeWindow(Number(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={30}>30 mins</option>
                                <option value={60}>60 mins</option>
                                <option value={120}>2 hours</option>
                                <option value={1440}>24 hours</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Escalation Action</label>
                        <select
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ESCALATE">Mark as ESCALATED</option>
                            <option value="AUTO_CLOSE">Mark as AUTO-CLOSED</option>
                            <option value="NOTIFY_MANAGER">Notify Fleet Manager</option>
                        </select>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center text-sm font-medium">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            {error}
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default RuleModal;