# DESIGN — PmIT Fullstack Challenge (Personas)

## 0) Decisión general
Se utiliza **FastAPI** para el backend por su rapidez de implementación, validación integrada (Pydantic) y generación automática de documentación (OpenAPI), manteniendo una estructura simple pero escalable por módulos.
Por el lado FrontEnd se utiliza React Vite + Typescript para tipar y reducir posibilidad de errores generales.

## 1) Supuestos
- No se requiere autenticación/autorización para este challenge (no hay login ni register).
- `nombre` es obligatorio y se normaliza con `trim()` para evitar espacios al inicio/fin.
- `edad` es obligatoria y se valida en rango razonable (0–120).
- Persistencia local por defecto con SQLite para facilitar correr el proyecto. La estructura permite migrar a PostgreSQL sin cambiar la API.
- El sistema esta pensado para escalar a un módulo mayor manteniendo una arquitectura basica clara: `routers/`, `schemas/`, `models/`, `db/`, `core/`.

## 2) Modelo de datos
Tabla: `persons`

Campos:
- `id`: integer, PK, autoincrement  (escalable para eliminar y modificar entradas)
- `nombre`: string(80), NOT NULL (sin restricciones de nombres)
- `edad`: integer, NOT NULL (maximo 120)
- `created_at`: datetime, NOT NULL (default: now)

## 3) Contratos API

### POST /personas
Crea una persona.

**Request**
```json```
{ "nombre": "Agustin", "edad": 27 }

**201 Response**
```json```
{ "id": 1, "nombre": "Agustin", "edad": 27, "created_at": "2026-01-04T12:00:00Z" }

**422 (Validation Error)**
```json```
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [
      { "field": "edad", "message": "Input should be less than or equal to 120" }
    ]
  }
}

### GET /personas
Lista todas las personas registradas.

**200 Response**
```json```
[
  { "id": 1, "nombre": "Agustin", "edad": 27, "created_at": "2026-01-04T12:00:00Z" }
]


**500 (Internal Error)**
```json```
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Unexpected error"
  }
}

### Decisiones técnicas
  -FastAPI + Pydantic: validación de entrada y docs automáticas (/docs).
  -SQLAlchemy: ORM para mantener separación entre modelos/datos y lógica de negocio, y facilitar migración SQLite - PostgreSQL sin cambiar la API.
  -CORS por env: ALLOWED_ORIGINS configurable (local vs deploy).

## Frontend: React (Vite + TypeScript)**
  - Preferencia de TypeScript por sobre JavaScript para tipar y reducir errores de integración.
  - Separación simple: `api/` (cliente HTTP), `components/` (UI), `types/` (modelos).
  - Manejo de estados mínimos: `loading`, `error` y actualización del listado al crear.

## Flujo UI (Frontend)
- Al cargar la app: se ejecuta `GET /personas` y se muestra listado.
- Formulario: `nombre` y `edad` con validación básica en cliente (UX).
- Submit: `POST /personas`; en éxito se agrega al listado sin recargar; en error se muestra banner.
- Estados contemplados: loading del listado, error de red/validación, empty state.

- UI minimalista (sin librerías de diseño) para priorizar claridad y funcionalidad.
- Validación duplicada (cliente + servidor): el servidor es la fuente de verdad, el cliente solo mejora UX.

## Trade-offs
- No se implementaron operaciones extra (update/delete) para mantenerse dentro de la especificación mínima.
- No se implementó paginación server-side (solo UI) por simplicidad; en producción se haría GET /personas?limit=&offset= o cursor-based pagination.
- No se implementó autenticación, rate limiting ni logging estructurado; en producción se agregarían según requerimientos.