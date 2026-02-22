import React from 'react';
import { X, Clock, User, Truck, Shield, Hash, Activity, Gauge, FileWarning, Zap } from 'lucide-react';
import StateTimeline from './StateTimeline';

const AlertModal = ({ alert, onClose, onResolve }) => {
    if (!alert) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[999] flex justify-center items-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2.5 rounded-xl ${alert.severity === 'Critical' ? 'bg-red-100' : 'bg-amber-100'}`}>
                            <Shield className={`w-6 h-6 ${alert.severity === 'Critical' ? 'text-red-600' : 'text-amber-600'}`} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-tight">Alert Detail & Lifecycle View</h2>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Fleet Monitoring System</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-all group">
                        <X className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left Column: Metadata Details */}
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5">Alert Metadata</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <Hash className="w-4 h-4 text-blue-500 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Alert ID</p>
                                        <p className="text-sm font-bold text-gray-800">#{alert.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Activity className="w-4 h-4 text-purple-500 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Rule Triggered</p>
                                        <p className="text-sm font-bold text-gray-800">{alert.source}</p>
                                    </div>
                                </div>

                                {/* DYNAMIC METADATA RENDERED BASED ON ALERT TYPE */}
                                {alert.source === "Overspeeding" && (
                                    <div className="flex items-start space-x-3">
                                        <Gauge className="w-4 h-4 text-red-500 mt-1" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Recorded Speed</p>
                                            <p className="text-sm font-bold text-red-600">{alert.metadata?.speed || '95 km/h'}</p>
                                        </div>
                                    </div>
                                )}

                                {alert.source === "Document Expiry" && (
                                    <div className="flex items-start space-x-3">
                                        <FileWarning className="w-4 h-4 text-amber-500 mt-1" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Compliance Info</p>
                                            <p className="text-sm font-bold text-amber-600">{alert.metadata?.docName || 'Insurance Policy'}</p>
                                        </div>
                                    </div>
                                )}

                                {alert.source === "Hard Braking" && (
                                    <div className="flex items-start space-x-3">
                                        <Zap className="w-4 h-4 text-orange-500 mt-1" />
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Impact Intensity</p>
                                            <p className="text-sm font-bold text-orange-600">{alert.metadata?.gForce || '1.8g'}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <Clock className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Created At</p>
                                        <p className="text-sm font-bold text-gray-800">{new Date(alert.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Entity Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-lg"><User className="w-4 h-4 text-blue-600" /></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">{alert.driver}</p>
                                            <p className="text-[10px] text-gray-500">Authorized Personnel</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">DRIVER</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-100 p-2 rounded-lg"><Truck className="w-4 h-4 text-gray-600" /></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">{alert.vehicleId}</p>
                                            <p className="text-[10px] text-gray-500">Fleet Asset ID</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">VEHICLE</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Visual Lifecycle Tracking */}
                    <div className="border-l border-gray-100 pl-10">
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Current Lifecycle Status</h3>
                        <StateTimeline status={alert.status} timestamp={alert.timestamp} source={alert.source} />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t bg-gray-50/50 flex justify-end items-center space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-all"
                    >
                        Close View
                    </button>
                    {alert.status !== 'RESOLVED' && alert.status !== 'AUTO-CLOSED' && (
                        <button
                            onClick={() => onResolve(alert.id)}
                            className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                        >
                            Resolve Alert
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertModal;