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
    <form onSubmit={handleSubmit} className="d-grid gap-3">
        <div>
        <label className="form-label">Nombre</label>
        <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Agustin"
            maxLength={80}
        />
        <div className="form-text">Obligatorio. Mínimo 2 caracteres.</div>
        </div>

        <div>
        <label className="form-label">Edad</label>
        <input
            className="form-control"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="27"
            type="number"
            min={0}
            max={120}
        />
        <div className="form-text">Rango permitido: 0 a 120.</div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? (
            <>
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            Guardando...
            </>
        ) : (
            "Guardar"
        )}
        </button>
    </form>
    );
}