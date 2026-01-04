import { useState } from "react";
import { createPerson } from "../api/persons";
import type { Person } from "../types/person";

type Props = {
    onCreated: (p: Person) => void;
    onError: (msg: string) => void;
};

export function PersonForm({ onCreated, onError }: Props) {
const [nombre, setNombre] = useState("");
const [edad, setEdad] = useState<string>("");
const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onError("");

        const n = nombre.trim();
        const age = Number(edad);

        if (n.length < 2) return onError("Nombre tiene que tener al menos dos caracteres.");
        if (!Number.isInteger(age)) return onError("La edad debe ser un numero entero.");
        if (age < 0 || age > 120) return onError("La edad debe ser entre 0 y 120 años.");

        setLoading(true);
        try {
        const created = await createPerson({ nombre: n, edad: age });
        onCreated(created);
        setNombre("");
        setEdad("");
        } catch (err: any) {
        onError(err?.message ?? "Error al registrar persona");
        } finally {
        setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <h3 style={{ margin: 0 }}>Registrar persona</h3>

        <label style={{ display: "grid", gap: 6 }}>
            Nombre
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Agustin" />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
            Edad
            <input value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="27" type="number" min={0} max={120} />
        </label>

        <button type="submit" disabled={loading} style={{ padding: 10, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Guardando..." : "Guardar"}
        </button>
        </form>
    );
}