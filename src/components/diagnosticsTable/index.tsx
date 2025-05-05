import React, { useMemo } from "react";

import "./diagnosticsTableStyles.css";
import { Diagnostic } from "../../models/diagnostic";
import { useSeverityUtils } from "../../hooks/useSeverityUtils";

interface Props {
    diagnostics: Diagnostic[];
}

const DiagnosticTable: React.FC<Props> = ({ diagnostics }) => {
    const { compareSeverity } = useSeverityUtils();

    const sortedDiagnostics = useMemo(() => diagnostics.sort((a, b) => {
        const dateCompare = b.createdAt.getTime() - a.createdAt.getTime();
        return dateCompare !== 0 ? dateCompare : compareSeverity(a.severity, b.severity);
    }), [diagnostics]);

    return (
        <section className="table-section">
            <table className="diagnostic-table">
                <thead>
                    <tr>
                        <th>Diagnostic date</th>
                        <th>Fault type</th>
                        <th>Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedDiagnostics.map((diag) => (
                        <tr key={diag.diagnosticId}>
                            <td style={{borderRadius:"8px 0 0 8px"}}>{diag.createdAt.toLocaleDateString("en-GB")}</td>
                            <td>{diag.type}</td>
                            <td style={{borderRadius:"0 8px 8px 0"}}>{diag.severity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default DiagnosticTable;
