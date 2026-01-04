export type Person = {
    id: number;
    nombre: string;
    edad: number;
    created_at: string;
};

export type ApiError = {
    error: {
        code: string;
        message: string;
        details: { field: string; message: string }[];
    };
};