import { useMemo } from "react";
import { Diagnostic } from "../models/diagnostic";
import { useSeverityUtils } from "./useSeverityUtils";

export const useDiagnosticsGraph = (
  diagnostics: Diagnostic[],
  fromDate: string | null
) => {
  const { compareSeverity } = useSeverityUtils();

  const dailyMostSevereDiagnostics = useMemo(() => {
    const mostSevereByDay: Record<string, Diagnostic> = {};

    diagnostics.forEach((diagnostic) => {
      const key = diagnostic.createdAt.toISOString().split("T")[0];
      if (!mostSevereByDay[key] || compareSeverity(diagnostic.severity, mostSevereByDay[key].severity) < 0) {
        mostSevereByDay[key] = diagnostic;
      }
    });

    return Object.values(mostSevereByDay);
  }, [diagnostics, compareSeverity]);

  const diagnosticTrendData = useMemo(() => {
    const from = fromDate ? new Date(fromDate) : null;

    return dailyMostSevereDiagnostics
      .filter((diagnostic) => !from || diagnostic.createdAt >= from)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((diagnostic) => ({
        day: diagnostic.createdAt,
        severity: diagnostic.severity,
        type: diagnostic.type,
      }));
  }, [dailyMostSevereDiagnostics, fromDate]);

  return { diagnosticTrendData };
};
