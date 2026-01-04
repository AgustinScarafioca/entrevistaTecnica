import type { ApiError } from "../types/person";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export class HttpError extends Error {
    status: number;
    body?: unknown;

    constructor(message: string, status: number, body?: unknown) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.body = body;
    }
}

function isApiError(x: unknown): x is ApiError {
    return (
        typeof x === "object" &&
        x !== null &&
        "error" in x &&
        typeof (x as any).error?.code === "string" &&
        typeof (x as any).error?.message === "string"
    );
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
    if (!API_URL) throw new Error("VITE_API_URL no seteada. Agregar al .env");

    const res = await fetch(`${API_URL}${path}`, {
        headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
        },
        ...options,
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const body = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

    if (!res.ok) {
        const msg =
        isApiError(body) ? body.error.message : typeof body === "string" && body ? body : `Request failed (${res.status})`;
        throw new HttpError(msg, res.status, body);
    }

    return body as T;
}