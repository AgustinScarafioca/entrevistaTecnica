import type { Person } from "../types/person";

type Props = {
    persons: Person[];
    loading: boolean;
};

export function PersonList({ persons, loading }: Props) {
    return (
    <div>
        {loading ? (
        <div className="py-4 text-center text-secondary">
            <div className="spinner-border" role="status" aria-label="Cargando"></div>
            <div className="mt-2 small">Cargando...</div>
        </div>
        ) : persons.length === 0 ? (
        <div className="py-4 text-center text-secondary">
            <div className="small">No hay personas.</div>
        </div>
        ) : (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Nombre</th>
                <th style={{ width: 120 }}>Edad</th>
                </tr>
            </thead>
            <tbody>
                {persons.map((p) => (
                <tr key={p.id}>
                    <td className="text-secondary">{p.id}</td>
                    <td className="fw-semibold">{p.nombre}</td>
                    <td>{p.edad}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </div>
    );
}