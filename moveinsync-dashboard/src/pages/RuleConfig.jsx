import React, { useState } from 'react';
import { Settings, Edit2, CheckCircle, AlertOctagon, X } from 'lucide-react';
import RuleModal from '../components/Rules/RuleModal';

// NAYA IMPORT: App ke "Brain" se connect karne ke liye
import { useAlerts } from '../context/AlertContext';

const RuleConfig = () => {
    // SABSE BADA BADLAAV: Local useState hata diya! Ab Global Context se Rules aa rahe hain.
    const { rules, setRules } = useAlerts();

    const [editingRule, setEditingRule] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [errorBanner, setErrorBanner] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Toggle active/inactive
    const toggleRule = (id) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
        showToast('Rule status updated successfully!');
        setErrorBanner(''); 
    };

    // Simulated API Save Function
    const saveRule = async (updatedRule) => {
        setIsSaving(true);
        setErrorBanner('');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (updatedRule.threshold > 100) {
                throw new Error("API Error: Threshold is unreasonably high. Configuration rejected.");
            }

            // Global rules update ho rahe hain!
            setRules(rules.map(r => r.id === updatedRule.id ? updatedRule : r));
            setEditingRule(null);
            showToast('Rule configuration saved successfully!');
            
        } catch (error) {
            setErrorBanner(error.message || 'Failed to save rule configuration.');
            setEditingRule(null); 
        } finally {
            setIsSaving(false);
        }
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div className="p-8 relative min-h-screen">
            
            {/* SUCCESS TOAST */}
            {toastMessage && (
                <div className="fixed top-6 right-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-md flex items-center space-x-2 z-50 animate-in slide-in-from-top-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-sm">{toastMessage}</span>
                </div>
            )}

            <header className="mb-6 text-left">
                <h1 className="text-2xl font-bold text-gray-800">Rule Configuration</h1>
                <p className="text-gray-500 text-sm">Manage active escalation and auto-close rules</p>
            </header>

            {/* ERROR BANNER */}
            {errorBanner && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex items-start justify-between animate-in fade-in">
                    <div className="flex items-center">
                        <AlertOctagon className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-red-800 font-bold text-sm">{errorBanner}</span>
                    </div>
                    <button onClick={() => setErrorBanner('')} className="text-red-400 hover:text-red-600 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-bold text-gray-800">Active Escalation Rules</h3>
                    {isSaving && <span className="ml-4 text-xs font-bold text-blue-500 animate-pulse">Saving changes to server...</span>}
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
                            <tr key={rule.id} className={`hover:bg-gray-50 transition-colors ${!rule.active ? 'opacity-60' : ''}`}>
                                <td className="px-6 py-4 font-bold text-gray-900 text-sm">{rule.name}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-500">{rule.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="bg-gray-50 border border-gray-100 rounded-md inline-block px-3 py-1.5">
                                        If count <span className="font-black text-blue-600">&ge; {rule.threshold}</span> within <span className="font-black text-gray-800">{rule.timeWindow}m</span> &rarr; <span className="font-bold text-gray-600">{rule.action}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleRule(rule.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${rule.active ? 'translate-x-6' : 'translate-x-1'}`} />
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