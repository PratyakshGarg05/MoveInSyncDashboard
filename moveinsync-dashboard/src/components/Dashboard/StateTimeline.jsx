import React from 'react';
import { Clock, ShieldAlert, Bot, UserCheck, CircleDashed } from 'lucide-react';

const StateTimeline = ({ status, timestamp, source }) => {
    const baseTime = new Date(timestamp);

    const getTime = (minutesToAdd) => {
        return new Date(baseTime.getTime() + minutesToAdd * 60000).toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit'
        });
    };

    const getEscalationReason = (alertSource) => {
        switch (alertSource) {
            case 'Overspeeding': return 'Escalated: 3 overspeeds in 60 min';
            case 'Document Expiry': return 'Escalated: Document expired > 7 days';
            case 'Hard Braking': return 'Escalated: Repeated severe G-force events';
            case 'Route Deviation': return 'Escalated: Deviated > 5 miles from route';
            case 'Negative Feedback': return 'Escalated: Multiple critical passenger complaints';
            default: return 'Escalated: Violation threshold exceeded';
        }
    };

    const getResolutionReason = (alertStatus, alertSource) => {
        if (alertStatus === 'AUTO-CLOSED') {
            switch (alertSource) {
                case 'Overspeeding': return 'Auto-closed: Speed normalized for 15 mins';
                case 'Document Expiry': return 'Auto-closed: Document renewed & verified';
                case 'Hard Braking': return 'Auto-closed: Driving behavior stabilized';
                case 'Route Deviation': return 'Auto-closed: Vehicle returned to assigned route';
                case 'Negative Feedback': return 'Auto-closed: Passenger updated rating';
                default: return 'System auto-reconciled';
            }
        }
        return 'Resolved manually by Operations Team';
    };

    const isEscalated = status === 'ESCALATED' || status === 'RESOLVED' || status === 'AUTO-CLOSED';
    const isResolved = status === 'RESOLVED' || status === 'AUTO-CLOSED';

    const getFinalStepConfig = () => {
        if (!isResolved) {
            return { icon: CircleDashed, color: 'text-gray-300', bgColor: 'bg-gray-50' };
        }
        if (status === 'AUTO-CLOSED') {
            return { icon: Bot, color: 'text-slate-600', bgColor: 'bg-slate-100' };
        }
        return { icon: UserCheck, color: 'text-green-600', bgColor: 'bg-green-100' };
    };

    const finalStepStyle = getFinalStepConfig();

    const steps = [
        {
            label: 'OPEN',
            time: getTime(0),
            desc: 'Alert triggered by monitoring system',
            icon: Clock,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            isActive: true,
            tag: 'System Auto-Logged'
        },
        {
            label: 'ESCALATED',
            time: isEscalated ? getTime(15) : '--:--',
            desc: isEscalated ? getEscalationReason(source) : 'Pending escalation review',
            icon: ShieldAlert,
            color: isEscalated ? 'text-red-500' : 'text-gray-300',
            bgColor: isEscalated ? 'bg-red-50' : 'bg-gray-50',
            isActive: isEscalated,
            tag: 'System Auto-Logged'
        },
        {
            label: status === 'AUTO-CLOSED' ? 'AUTO-CLOSED' : 'RESOLVED',
            time: isResolved ? getTime(45) : '--:--',
            desc: isResolved ? getResolutionReason(status, source) : 'Awaiting resolution',
            icon: finalStepStyle.icon, // Dynamic Icon
            color: finalStepStyle.color, // Dynamic Color
            bgColor: finalStepStyle.bgColor, // Dynamic Background
            isActive: isResolved,
            // Visual Tagging
            tag: status === 'RESOLVED' ? 'Manual Action' : 'System Auto-Logged',
            isManual: status === 'RESOLVED'
        }
    ];

    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-100">
            {steps.map((step, index) => (
                <div key={index} className={`relative flex items-start space-x-4 ${!step.isActive && 'opacity-40 grayscale'}`}>
                    <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-sm transition-all duration-300 ${step.bgColor}`}>
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <p className={`text-xs font-black tracking-widest ${step.color}`}>{step.label}</p>
                            <p className={`text-[10px] font-bold ${step.isActive ? 'text-gray-400' : 'text-gray-300'}`}>{step.time}</p>
                        </div>

                        <p className={`text-sm mt-1 ${step.isActive ? 'font-bold text-gray-700' : 'font-medium text-gray-400 italic'}`}>
                            {step.desc}
                        </p>

                        {/* Visual Distinction Tag */}
                        {step.isActive && (
                            <div className="mt-1.5 inline-flex items-center">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border 
                  ${step.isManual
                                        ? 'bg-green-50 text-green-600 border-green-200'
                                        : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                    {step.tag}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StateTimeline;