import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAlerts } from '../data/mockAlerts';

const AlertContext = createContext();

export const useAlerts = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    // 1. Live Rules State
    const [rules, setRules] = useState([
        { id: 'R-01', name: 'Critical Overspeed', type: 'Overspeeding', threshold: 3, timeWindow: 60, action: 'ESCALATE', active: true },
        { id: 'R-02', name: 'Doc Expiry Warning', type: 'Document Expiry', threshold: 1, timeWindow: 1440, action: 'NOTIFY_MANAGER', active: true },
        { id: 'R-03', name: 'Feedback Auto-Close', type: 'Negative Feedback', threshold: 1, timeWindow: 30, action: 'AUTO_CLOSE', active: false },
    ]);

    // 2. Live Alerts State
    const [alertsData, setAlertsData] = useState(mockAlerts);

    // 3. Jadoo: Jab rules change honge, Alerts bina reload ke calculate honge
    useEffect(() => {
        const reEvaluatedAlerts = mockAlerts.map(alert => {
            let currentStatus = alert.status;
            const matchingRule = rules.find(r => r.type === alert.source);

            if (matchingRule) {
                // Agar rule off kiya, ya threshold badha diya (e.g. 50), toh ESCALATED alert OPEN ho jayega
                if (!matchingRule.active && currentStatus === 'ESCALATED') {
                    currentStatus = 'OPEN';
                } else if (matchingRule.threshold > 4 && currentStatus === 'ESCALATED') {
                    currentStatus = 'OPEN';
                }
            }
            return { ...alert, status: currentStatus };
        });
        
        setAlertsData(reEvaluatedAlerts);
    }, [rules]);

    return (
        <AlertContext.Provider value={{ rules, setRules, alertsData, setAlertsData }}>
            {children}
        </AlertContext.Provider>
    );
};