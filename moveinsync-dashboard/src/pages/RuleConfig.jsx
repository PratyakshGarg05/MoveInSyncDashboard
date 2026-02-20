import React, { useState } from 'react';
import { Settings, Edit2, CheckCircle } from 'lucide-react';
import RuleModal from '../components/Rules/RuleModal';

const RuleConfig = () => {
    // Initial dummy rules
    const [rules, setRules] = useState([
        { id: 'R-01', name: 'Critical Overspeed', type: 'Overspeeding', threshold: 3, timeWindow: 60, action: 'ESCALATE', active: true },
        { id: 'R-02', name: 'Doc Expiry Warning', type: 'Document Expiry', threshold: 1, timeWindow: 1440, action: 'NOTIFY_MANAGER', active: true },
        { id: 'R-03', name: 'Feedback Auto-Close', type: 'Negative Feedback', threshold: 1, timeWindow: 30, action: 'AUTO_CLOSE', active: false },
    ]);

    const [editingRule, setEditingRule] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    // Toggle active/inactive without deleting [cite: 107]
    const toggleRule = (id) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
        showToast('Rule status updated successfully!');
    };

    const saveRule = (updatedRule) => {
        setRules(rules.map(r => r.id === updatedRule.id ? updatedRule : r));
        setEditingRule(null);
        showToast('Rule configuration saved successfully!');
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div className="p-8 relative min-h-screen">
            {/* Toast Notification  */}
            {toastMessage && (
                <div className="fixed top-6 right-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 z-50 transition-all">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-sm">{toastMessage}</span>
                </div>
            )}

            <header className="mb-8 text-left">
                <h1 className="text-2xl font-bold text-gray-800">Rule Configuration</h1>
                <p className="text-gray-500 text-sm">Manage active escalation and auto-close rules</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-bold text-gray-800">Active Escalation Rules</h3>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <th className="px-6 py-4">Rule Name</th>
                            <th className="px-6 py-4">Alert Type</th>
                            <th className="px-6 py-4">Condition</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rules.map((rule) => (
                            <tr key={rule.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900 text-sm">{rule.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{rule.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 bg-gray-50 rounded-md my-2 inline-block px-3 py-1 ml-4 mt-3">
                                    If count <span className="font-bold">&ge; {rule.threshold}</span> within <span className="font-bold">{rule.timeWindow}m</span> &rarr; {rule.action}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Toggle Switch */}
                                    <button
                                        onClick={() => toggleRule(rule.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${rule.active ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => setEditingRule(rule)} className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Show Modal if a rule is being edited */}
            {editingRule && (
                <RuleModal
                    rule={editingRule}
                    onClose={() => setEditingRule(null)}
                    onSave={saveRule}
                />
            )}
        </div>
    );
};

export default RuleConfig;