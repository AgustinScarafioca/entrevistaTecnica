import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./api/persons", () => {
    return {
        getPersons: vi.fn(),
        createPerson: vi.fn(),
    };
});

import { getPersons, createPerson } from "./api/persons";
import type { Person } from "./types/person";

const mockPeople: Person[] = [
    { id: 1, nombre: "Agustin", edad: 27, created_at: "2026-01-04T12:00:00Z" },
    { id: 2, nombre: "Pippin", edad: 28, created_at: "2026-01-04T12:01:00Z" },
];

beforeEach(() => {
    vi.clearAllMocks();
    });

describe("App", () => {
    it("loads and displays persons from API", async () => {
        (getPersons as any).mockResolvedValueOnce(mockPeople);

        render(<App />);

        expect(await screen.findByText(/Agustin/i)).toBeInTheDocument();
        expect(screen.getByText(/Pippin/i)).toBeInTheDocument();
    });

    it("submits form and adds created person to list", async () => {
        (getPersons as any).mockResolvedValueOnce([]);

        const created: Person = {
        id: 10,
        nombre: "Juancito Tuk",
        edad: 30,
        created_at: "2026-01-04T12:05:00Z",
        };

        (createPerson as any).mockResolvedValueOnce(created);

        render(<App />);

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Nombre/i), "Juancito Tuk");
        await user.type(screen.getByLabelText(/Edad/i), "30");

        await user.click(screen.getByRole("button", { name: /Guardar/i }));

        await waitFor(() => {
        expect(screen.getByText(/Juancito Tuk/i)).toBeInTheDocument();
        });
    });
});