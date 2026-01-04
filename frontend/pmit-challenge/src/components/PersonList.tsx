import type { Person } from "../types/person";

type Props = {
    persons: Person[];
    loading: boolean;
};

export function PersonList({ persons, loading }: Props) {
    return (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Personas registradas</h3>

        {loading ? <p>Cargando...</p> : null}
        {!loading && persons.length === 0 ? <p>No hay personas.</p> : null}

        <ul style={{ paddingLeft: 18 }}>
            {persons.map((p) => (
            <li key={p.id} style={{ marginBottom: 8 }}>
                <strong>{p.nombre}</strong> — {p.edad} años
            </li>
            ))}
        </ul>
        </div>
    );
}