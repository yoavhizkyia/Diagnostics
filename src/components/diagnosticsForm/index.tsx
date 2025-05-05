import React, { useState } from "react";

import { Diagnostic, DiagnosticType, SeverityType } from "../../models/diagnostic";
import "./diagnosticsFormStyles.css";

interface DiagnosticFormProps {
    setIsDiagnosticFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDiagnostics: React.Dispatch<React.SetStateAction<Diagnostic[]>>;
}

interface FormState {
    createdAt: string;
    type: DiagnosticType | "";
    severity: SeverityType | "";
}

const INITIAL_FORM: FormState = {
    createdAt: "",
    type: "",
    severity: "",
}

const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ setIsDiagnosticFormOpen, setDiagnostics }) => {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm(INITIAL_FORM)
        setIsDiagnosticFormOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.createdAt || !form.type || !form.severity) {
            alert("All fields are required.");
            return;
        }

        setDiagnostics((prev) => [...prev, {
            diagnosticId: prev.length + 1 + "",
            createdAt: new Date(form.createdAt),
            type: form.type as DiagnosticType,
            severity: form.severity as SeverityType,
        }])

        resetForm();
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h3 className="form-title">Add new diagnostic</h3>
            <div className="form-group">
                <label>Diagnostic date</label>
                <input
                    type="datetime-local"
                    name="createdAt"
                    value={form.createdAt}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Fault type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="bearing">Bearing</option>
                    <option value="gear">Gear</option>
                    <option value="motor">Motor</option>
                </select>
            </div>

            <div className="form-group">
                <label>Severity</label>
                <select name="severity" value={form.severity} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="healthy">Healthy</option>
                    <option value="alarm">Alarm</option>
                    <option value="critical">Critical</option>
                </select>
            </div>

            <div className="form-actions">
                <button className="btn cancel" onClick={() => resetForm()}>Cancel</button>
                <button className="btn save">Save</button>
            </div>

        </form>
    );
};

export default DiagnosticForm;
