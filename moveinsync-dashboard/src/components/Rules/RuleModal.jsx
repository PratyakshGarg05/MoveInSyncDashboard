import React, { useState } from 'react';
import { X, ArrowRight, AlertTriangle } from 'lucide-react';

const RuleModal = ({ rule, onClose, onSave }) => {
    // Form States
    const [type, setType] = useState(rule.type);
    const [threshold, setThreshold] = useState(rule.threshold);
    const [timeWindow, setTimeWindow] = useState(rule.timeWindow);
    const [action, setAction] = useState(rule.action);

    // Validation & Diff States
    const [error, setError] = useState('');
    const [showDiff, setShowDiff] = useState(false);

    const alertTypes = ['Overspeeding', 'Route Deviation', 'Hard Braking', 'Document Expiry', 'Negative Feedback'];

    const actions = [
        { value: 'ESCALATE', label: 'Mark as ESCALATED' },
        { value: 'AUTO_CLOSE', label: 'Mark as AUTO-CLOSED' },
        { value: 'NOTIFY_MANAGER', label: 'Notify Fleet Manager' }
    ];

    const timeWindows = [
        { value: 30, label: '30 mins' },
        { value: 60, label: '60 mins' },
        { value: 120, label: '2 hours' },
        { value: 1440, label: '24 hours' }
    ];

    const handlePreSave = () => {
        // 1. Validation (Must be >= 1)
        if (Number(threshold) < 1) {
            setError('Count threshold must be at least 1.');
            return;
        }
        setError('');

        // Check if anything actually changed
        if (type === rule.type && Number(threshold) === rule.threshold && Number(timeWindow) === rule.timeWindow && action === rule.action) {
            onClose(); // Koi change nahi hai, toh sidha close kar do
            return;
        }

        // 2. Agar validation pass aur changes hain, toh Diff screen dikhao
        setShowDiff(true);
    };

    const handleConfirmSave = () => {
        onSave({
            ...rule,
            type,
            threshold: Number(threshold),
            timeWindow: Number(timeWindow),
            action
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800">
                        {showDiff ? 'Review Changes' : 'Edit Escalation Rule'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 hover:text-gray-600 p-1.5 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!showDiff ? (
                        // --- EDIT FORM (Step 1) ---
                        <div className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg flex items-center border border-red-100">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                            )}

                            {/* Alert Type Ab Proper Dropdown Hai */}
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Alert Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer">
                                    {alertTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Count Threshold</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={threshold}
                                        onChange={(e) => setThreshold(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Time Window</label>
                                    <select value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer">
                                        {timeWindows.map(tw => <option key={tw.value} value={tw.value}>{tw.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Escalation Action</label>
                                <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer">
                                    {actions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                                </select>
                            </div>
                        </div>
                    ) : (
                        // --- DIFF PREVIEW SCREEN (Step 2) ---
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
                            <p className="text-sm font-medium text-gray-600 mb-2">Please confirm the following changes to <span className="font-bold text-gray-800">"{rule.name}"</span>:</p>

                            <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200 shadow-inner">
                                {type !== rule.type && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-500">Type</span>
                                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded border border-gray-100">
                                            <span className="line-through text-red-400 font-medium">{rule.type}</span>
                                            <ArrowRight className="w-3 h-3 text-gray-400" />
                                            <span className="text-green-600 font-bold">{type}</span>
                                        </div>
                                    </div>
                                )}
                                {Number(threshold) !== rule.threshold && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-500">Threshold</span>
                                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded border border-gray-100">
                                            <span className="line-through text-red-400 font-medium">{rule.threshold}</span>
                                            <ArrowRight className="w-3 h-3 text-gray-400" />
                                            <span className="text-green-600 font-bold">{threshold}</span>
                                        </div>
                                    </div>
                                )}
                                {Number(timeWindow) !== rule.timeWindow && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-500">Time Window</span>
                                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded border border-gray-100">
                                            <span className="line-through text-red-400 font-medium">{timeWindows.find(t => t.value === rule.timeWindow)?.label || `${rule.timeWindow}m`}</span>
                                            <ArrowRight className="w-3 h-3 text-gray-400" />
                                            <span className="text-green-600 font-bold">{timeWindows.find(t => t.value === Number(timeWindow))?.label || `${timeWindow}m`}</span>
                                        </div>
                                    </div>
                                )}
                                {action !== rule.action && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-500">Action</span>
                                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded border border-gray-100">
                                            <span className="line-through text-red-400 font-medium">{actions.find(a => a.value === rule.action)?.label || rule.action}</span>
                                            <ArrowRight className="w-3 h-3 text-gray-400" />
                                            <span className="text-green-600 font-bold">{actions.find(a => a.value === action)?.label || action}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                        onClick={showDiff ? () => setShowDiff(false) : onClose}
                        className="px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        {showDiff ? 'Back to Edit' : 'Cancel'}
                    </button>
                    <button
                        onClick={showDiff ? handleConfirmSave : handlePreSave}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                    >
                        {showDiff ? 'Confirm & Save' : 'Review Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RuleModal;