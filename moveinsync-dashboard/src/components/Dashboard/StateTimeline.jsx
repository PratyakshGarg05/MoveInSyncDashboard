import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const StateTimeline = ({ status }) => {
    // Ye ek dummy timeline hai jo PDF ki requirements ke hisaab se banayi gayi hai
    const timelineEvents = [
        { state: 'OPEN', time: '14:30 PM', reason: 'Alert triggered by system', type: 'auto', icon: AlertTriangle, color: 'text-blue-500' },
        { state: 'ESCALATED', time: '14:45 PM', reason: 'Escalated: 3 overspeeds in 60 min', type: 'auto', icon: Clock, color: 'text-red-500' }
    ];

    if (status === 'RESOLVED' || status === 'AUTO-CLOSED') {
        timelineEvents.push({
            state: status,
            time: '15:10 PM',
            reason: status === 'RESOLVED' ? 'Manual resolution by Admin' : 'Auto-closed: document renewed',
            type: status === 'RESOLVED' ? 'manual' : 'auto',
            icon: CheckCircle,
            color: status === 'RESOLVED' ? 'text-green-500' : 'text-gray-500'
        });
    }

    return (
        <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-800 mb-4">State Transition Timeline</h4>
            <div className="space-y-6 border-l-2 border-gray-200 ml-3">
                {timelineEvents.map((event, index) => {
                    const Icon = event.icon;
                    return (
                        <div key={index} className="relative pl-6">
                            <span className="absolute -left-3 top-1 bg-white p-0.5 rounded-full">
                                <Icon className={`w-5 h-5 ${event.color}`} />
                            </span>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{event.state}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{event.time} • {event.type === 'manual' ? 'Manual Action' : 'System Auto'}</p>
                                <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded-md inline-block">{event.reason}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StateTimeline;