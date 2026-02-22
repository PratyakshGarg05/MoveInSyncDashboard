import React, { createContext, useContext, useState, useEffect } from 'react';

const generateMockData = () => {
    const sources = ['Overspeeding', 'Hard Braking', 'Route Deviation', 'Idle Time Exceeded', 'Document Expiry', 'Negative Feedback'];
    const severities = ['Critical', 'Warning', 'Info'];
    const statuses = ['OPEN', 'ESCALATED', 'AUTO-CLOSED', 'RESOLVED'];
    const drivers = [
        { name: 'Rajesh Kumar', vehicle: 'KA-01-MJ-1234' },
        { name: 'Amit Singh', vehicle: 'DL-02-RE-5678' },
        { name: 'Priya Das', vehicle: 'MH-01-AS-9988' },
        { name: 'Suresh Raina', vehicle: 'UP-14-BT-9012' },
        { name: 'Rahul Verma', vehicle: 'RJ-14-CC-5566' },
        { name: 'Manoj Tiwari', vehicle: 'BR-01-EE-9900' }
    ];

    const alerts = [];
    for (let i = 1; i <= 50; i++) {
        const driverInfo = drivers[Math.floor(Math.random() * drivers.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const pastDate = new Date();
        pastDate.setHours(pastDate.getHours() - Math.floor(Math.random() * 168));

        alerts.push({
            id: `AL-${1000 + i}`,
            source: sources[Math.floor(Math.random() * sources.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: status,
            timestamp: pastDate.toISOString(),
            driver: driverInfo.name,
            vehicleId: driverInfo.vehicle
        });
    }
    return alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const initialRules = [
    { id: 1, name: 'Overspeeding Limit', type: 'Velocity', threshold: 65, timeWindow: 5, action: 'Escalate to Manager', active: true },
    { id: 2, name: 'Idle Time Maximum', type: 'Engine', threshold: 15, timeWindow: 15, action: 'Auto-Close Route', active: true },
    { id: 3, name: 'Route Deviation', type: 'Geofence', threshold: 2, timeWindow: 10, action: 'Alert Driver', active: true },
    { id: 4, name: 'Hard Braking', type: 'Telematics', threshold: 7, timeWindow: 1, action: 'Log Incident', active: false }
];

const AlertContext = createContext();

export const useAlerts = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alertsData, setAlertsData] = useState(() => {
        const saved = localStorage.getItem('fleetAlerts');
        if (saved) return JSON.parse(saved);
        return [];
    });

    const [rules, setRules] = useState(() => {
        const saved = localStorage.getItem('fleetRules');
        if (saved) return JSON.parse(saved);
        return initialRules;
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem('fleetRules', JSON.stringify(rules));
    }, [rules]);

    useEffect(() => {
        if (alertsData.length > 0) {
            localStorage.setItem('fleetAlerts', JSON.stringify(alertsData));
        }
    }, [alertsData]);

    useEffect(() => {
        const fetchFleetData = async () => {
            if (alertsData.length === 0) {
                setIsLoading(true);
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setAlertsData(generateMockData());
                } catch (err) {
                    setError("Failed to connect to Fleet Servers.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchFleetData();
    }, [alertsData.length]);

    return (
        <AlertContext.Provider value={{ alertsData, setAlertsData, rules, setRules, isLoading, error }}>
            {children}
        </AlertContext.Provider>
    );
};