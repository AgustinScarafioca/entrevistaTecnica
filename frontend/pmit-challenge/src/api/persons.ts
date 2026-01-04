import { request } from "./client";
import type { Person } from "../types/person";

export type CreatePersonInput = {
    nombre: string;
    edad: number;
};

export function getPersons(): Promise<Person[]> {
    return request<Person[]>("/personas");
}

export function createPerson(input: CreatePersonInput): Promise<Person> {
    return request<Person>("/personas", {
        method: "POST",
        body: JSON.stringify(input),
    });
}