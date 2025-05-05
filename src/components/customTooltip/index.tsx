import React from "react";

import { useSeverityUtils } from "../../hooks/useSeverityUtils";
import "./customTooltipStyles.css"; 

interface Props {
    active?: boolean;
    payload?: any
}

const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
    const {getSeverityLabel} = useSeverityUtils();

    if (active && payload?.length > 0) {
        const diagnostic = payload[0].payload;
        return (
            <div className="tooltip">
                <strong>{getSeverityLabel(diagnostic.severity)}</strong>
                <div>Type: {diagnostic.type}</div>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;
