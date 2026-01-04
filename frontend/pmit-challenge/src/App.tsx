import { useEffect, useState } from "react";
import type { Person } from "./types/person";
import { getPersons } from "./api/persons";
import { PersonForm } from "./components/PersonForm";
import { PersonList } from "./components/PersonList";
import { ErrorBanner } from "./components/ErrorBanner";

export default function App() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadPersons() {
        setError("");
        setLoading(true);
        try {
        const data = await getPersons();
        setPersons(data);
        } catch (err: any) {
        setError(err?.message ?? "Error al cargar personas");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        loadPersons();
    }, []);

    return (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: 20, display: "grid", gap: 16 }}>
        <h2 style={{ margin: 0 }}>PmIT Challenge — Personas</h2>

        {error ? <ErrorBanner message={error} onClose={() => setError("")} /> : null}

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
            <PersonForm
            onCreated={(p) => setPersons((prev) => [p, ...prev])}
            onError={setError}
            />
            <PersonList persons={persons} loading={loading} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={loadPersons} disabled={loading} style={{ padding: 10, cursor: "pointer" }}>
            Actualizar lista
            </button>
        </div>
        </div>
    );
}