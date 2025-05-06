import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Dot
} from "recharts";

import "./diagnosticsGraphStyles.css";
import { useSeverityUtils } from "../../hooks/useSeverityUtils";
import { Diagnostic } from "../../models/diagnostic";
import CustomTooltip from "../customTooltip";
import { useDiagnosticsGraph } from "../../hooks/useDiagnosticGraph";

interface Props {
  diagnostics: Diagnostic[];
}

enum severityScore {
  critical = 1,
  alarm = 2,
  healthy = 3,
};

const formatDay = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

const DiagnosticsGraph: React.FC<Props> = ({ diagnostics }) => {
  const [fromDate, setFromDate] = useState<string>("");
  const { getSeverityColor } = useSeverityUtils();
  const { diagnosticTrendData } = useDiagnosticsGraph(diagnostics, fromDate);

  return (
    <div className="graph-section">
      <div className="graph-header">
        <h3>📈 Fusion trend</h3>
        <label>
          From:{" "}
          <input
            type="datetime-local"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
      </div>
      {
        diagnosticTrendData.length > 0 ? (
          <ResponsiveContainer height={200} className={'graph-container'}>
            <LineChart
              data={diagnosticTrendData}
              margin={{ top: 15, right: 40, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="10" />
              <XAxis
                dataKey="day"
                tickFormatter={(val) => formatDay(new Date(val))}
              />
              <YAxis tick={false} axisLine={false} width={0} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="linear"
                dataKey={(diagnostic: Diagnostic) => severityScore[diagnostic.severity]}
                stroke="#8884d8"
                dot={(props) => (
                  <Dot {...props} fill={getSeverityColor(props.payload.severity)} r={6} />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        ) :
          <div>
            <h3>No data available</h3>
            <p>Try changing the date range.</p>
          </div>
      }
    </div>
  );
};

export default DiagnosticsGraph;
