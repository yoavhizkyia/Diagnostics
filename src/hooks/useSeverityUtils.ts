import { SeverityType } from "../models/diagnostic";

const SEVERITY_ORDER = {
    critical: 0,
    alarm: 1,
    healthy: 2
};

const SEVERITY_COLORS = {
    critical: "#f44336",
    alarm: "#ff9800",
    healthy: "#4caf50"
};

const SEVERITY_LABELS = {
    critical: "Critical",
    alarm: "Warning",
    healthy: "Healthy"
};

export function useSeverityUtils() {
    const compareSeverity = (a: SeverityType, b: SeverityType) =>
        SEVERITY_ORDER[a] - SEVERITY_ORDER[b];

    const getSeverityColor = (severity: SeverityType) =>
        SEVERITY_COLORS[severity] || "#ccc";

    const getSeverityLabel = (severity: SeverityType) =>
        SEVERITY_LABELS[severity] || severity;

    return {
        compareSeverity,
        getSeverityColor,
        getSeverityLabel
    };
}
