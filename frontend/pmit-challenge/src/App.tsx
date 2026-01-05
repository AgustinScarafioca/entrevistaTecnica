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
    <div className="container py-4" style={{ maxWidth: 900 }}>
    <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
        <h2 className="mb-1">PmIT Challenge — Personas</h2>
        <div className="text-secondary small">Registrar y listar personas (FastAPI + React)</div>
        </div>

        <button
        onClick={loadPersons}
        disabled={loading}
        className="btn btn-outline-secondary"
        type="button"
        >
        {loading ? (
            <>
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            Actualizando...
            </>
        ) : (
            "Actualizar lista"
        )}
        </button>
    </div>

    {error ? (
        <div className="mb-3">
        <ErrorBanner message={error} onClose={() => setError("")} />
        </div>
    ) : null}

    <div className="row g-3">
        <div className="col-12 col-lg-6">
        <div className="card shadow-sm">
            <div className="card-body">
            <h5 className="card-title mb-3">Crear persona</h5>
            <PersonForm
                onCreated={(p) => setPersons((prev) => [p, ...prev])}
                onError={setError}
            />
            </div>
        </div>
        </div>

        <div className="col-12 col-lg-6">
        <div className="card shadow-sm">
            <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="card-title mb-0">Listado</h5>
                <span className="badge text-bg-secondary">{persons.length}</span>
            </div>
            <PersonList persons={persons} loading={loading} />
            </div>
        </div>
        </div>
    </div>
    </div>
    );
}