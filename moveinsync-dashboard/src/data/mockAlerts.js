export const mockAlerts = [
    // --- 20 Feb (Today) ---
    { id: "AL-1001", source: "Overspeeding", severity: "Critical", status: "OPEN", timestamp: "2026-02-20T14:30:00Z", driver: "Rajesh Kumar", vehicleId: "KA-01-MJ-1234", metadata: { speed: "95 km/h", limit: "80 km/h" } },
    { id: "AL-1002", source: "Document Expiry", severity: "Warning", status: "ESCALATED", timestamp: "2026-02-20T15:15:00Z", driver: "Amit Singh", vehicleId: "DL-02-RE-5678", metadata: { docName: "Insurance", expiryDate: "2026-02-18" } },
    { id: "AL-1003", source: "Hard Braking", severity: "Critical", status: "OPEN", timestamp: "2026-02-20T10:00:00Z", driver: "Priya Das", vehicleId: "MH-01-AS-9988", metadata: { gForce: "1.8g" } },
    { id: "AL-1004", source: "Route Deviation", severity: "Info", status: "AUTO-CLOSED", timestamp: "2026-02-20T09:00:00Z", driver: "Suresh Raina", vehicleId: "UP-14-BT-9012", metadata: { deviationMiles: "2 miles" } },
    { id: "AL-1005", source: "Overspeeding", severity: "Critical", status: "OPEN", timestamp: "2026-02-20T16:45:00Z", driver: "Rajesh Kumar", vehicleId: "KA-01-MJ-1234", metadata: { speed: "105 km/h" } },

    // --- 19 Feb ---
    { id: "AL-1006", source: "Hard Braking", severity: "Warning", status: "RESOLVED", timestamp: "2026-02-19T11:20:00Z", driver: "Vijay Sharma", vehicleId: "HR-26-CT-4321", metadata: { gForce: "1.2g" } },
    { id: "AL-1007", source: "Negative Feedback", severity: "Info", status: "RESOLVED", timestamp: "2026-02-19T14:10:00Z", driver: "Amit Singh", vehicleId: "DL-02-RE-5678", metadata: { reason: "Late arrival" } },
    { id: "AL-1008", source: "Overspeeding", severity: "Critical", status: "ESCALATED", timestamp: "2026-02-19T18:30:00Z", driver: "Vikram Gupta", vehicleId: "TS-09-ER-1122", metadata: { speed: "92 km/h" } },
    { id: "AL-1009", source: "Route Deviation", severity: "Warning", status: "OPEN", timestamp: "2026-02-19T20:00:00Z", driver: "Neha Sharma", vehicleId: "MP-04-KL-3344", metadata: { deviationMiles: "3.5 miles" } },

    // --- 18 Feb ---
    { id: "AL-1010", source: "Document Expiry", severity: "Critical", status: "OPEN", timestamp: "2026-02-18T10:30:00Z", driver: "Rajesh Kumar", vehicleId: "KA-01-MJ-1234", metadata: { docName: "Permit" } },
    { id: "AL-1011", source: "Idle Time Exceeded", severity: "Info", status: "AUTO-CLOSED", timestamp: "2026-02-18T13:45:00Z", driver: "Rahul Verma", vehicleId: "RJ-14-CC-5566", metadata: { idleTime: "45 mins" } },
    { id: "AL-1012", source: "Hard Braking", severity: "Warning", status: "OPEN", timestamp: "2026-02-18T15:20:00Z", driver: "Arjun Singh", vehicleId: "PB-08-DD-7788", metadata: { gForce: "1.1g" } },
    { id: "AL-1013", source: "Overspeeding", severity: "Critical", status: "ESCALATED", timestamp: "2026-02-18T19:00:00Z", driver: "Priya Das", vehicleId: "MH-01-AS-9988", metadata: { speed: "115 km/h" } },

    // --- 17 Feb ---
    { id: "AL-1014", source: "Negative Feedback", severity: "Warning", status: "RESOLVED", timestamp: "2026-02-17T08:15:00Z", driver: "Manoj Tiwari", vehicleId: "BR-01-EE-9900", metadata: { reason: "AC not working" } },
    { id: "AL-1015", source: "Route Deviation", severity: "Info", status: "AUTO-CLOSED", timestamp: "2026-02-17T12:00:00Z", driver: "Vikram Gupta", vehicleId: "TS-09-ER-1122", metadata: { deviationMiles: "1.2 miles" } },
    { id: "AL-1016", source: "Overspeeding", severity: "Critical", status: "OPEN", timestamp: "2026-02-17T16:40:00Z", driver: "Amit Singh", vehicleId: "DL-02-RE-5678", metadata: { speed: "98 km/h" } },
    { id: "AL-1017", source: "Hard Braking", severity: "Warning", status: "OPEN", timestamp: "2026-02-17T21:10:00Z", driver: "Vijay Sharma", vehicleId: "HR-26-CT-4321", metadata: { gForce: "1.3g" } },

    // --- 16 Feb ---
    { id: "AL-1018", source: "Overspeeding", severity: "Critical", status: "RESOLVED", timestamp: "2026-02-16T09:30:00Z", driver: "Rajesh Kumar", vehicleId: "KA-01-MJ-1234", metadata: { speed: "94 km/h" } },
    { id: "AL-1019", source: "Idle Time Exceeded", severity: "Info", status: "AUTO-CLOSED", timestamp: "2026-02-16T14:50:00Z", driver: "Neha Sharma", vehicleId: "MP-04-KL-3344", metadata: { idleTime: "35 mins" } },
    { id: "AL-1020", source: "Document Expiry", severity: "Warning", status: "ESCALATED", timestamp: "2026-02-16T17:25:00Z", driver: "Priya Das", vehicleId: "MH-01-AS-9988", metadata: { docName: "Fitness" } },

    // --- Adding more for volume (15 Feb back to 14 Feb) ---
    ...Array.from({ length: 30 }).map((_, i) => ({
        id: `AL-${1021 + i}`,
        source: ["Overspeeding", "Hard Braking", "Route Deviation", "Negative Feedback"][i % 4],
        severity: ["Critical", "Warning", "Info"][i % 3],
        status: ["OPEN", "ESCALATED", "RESOLVED", "AUTO-CLOSED"][i % 4],
        timestamp: `2026-02-${14 + (i % 3)}T${10 + (i % 10)}:00:00Z`,
        driver: ["Suresh Raina", "Rahul Verma", "Arjun Singh", "Manoj Tiwari", "Karan Johar", "Deepak Punia"][i % 6],
        vehicleId: `V-90${i}`,
        metadata: { info: "Bulk simulated data" }
    }))
];