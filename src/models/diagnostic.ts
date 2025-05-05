export type DiagnosticType = "bearing" | "gear" | "motor";
export type SeverityType = "healthy" | "alarm" | "critical";

export interface Diagnostic {
  diagnosticId: string;
  createdAt: Date;
  type: DiagnosticType;
  severity: SeverityType;
}
