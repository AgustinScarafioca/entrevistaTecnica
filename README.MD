# PmIT Fullstack Challenge — Personas (FastAPI + React)

Servicio para **registrar** y **listar** personas (nombre + edad), diseñado para poder escalar a un módulo más grande (ej. gestión de trámites).

## Demo (Deploy)

- **Frontend (Vercel):** https://entrevista-tecnica-gilt.vercel.app
- **Backend (Render):** https://entrevistatecnica.onrender.com
  - Health Check: `/health`
  - Documentación (Swagger): `/docs`

> **Nota:** En deploy se utiliza **PostgreSQL** (Render). En local se usa **SQLite** por simplicidad (sin cambiar la API).

> **Nota sobre la Demo:** El backend está alojado en el plan gratuito de Render. Si la API no responde inmediatamente, es debido al "Cold Start" (la instancia se apaga por inactividad). Aguardar unos 30-60 segundos tras la primera petición para que el servicio despierte.

## Stack

### Backend
- Python + **FastAPI**
- **SQLAlchemy** (ORM)
- SQLite (local) / PostgreSQL (deploy)
- `python-dotenv` para `.env`
- Errores consistentes (`error_response`)

### Frontend
- **React** + Vite + TypeScript
- Cliente HTTP con wrapper `request<T>` (manejo centralizado de errores)
- UI minimalista (sin librerías de diseño), foco en claridad

### Tests (Extras)
- Backend: **Pytest** + TestClient
- Frontend: **Vitest** + React Testing Library

---

## Funcionalidades

- Registrar una persona (nombre + edad)  
- Listar personas registradas  
- Errores consistentes y claros (HTTP + formato uniforme)  
- Validaciones mínimas (server-side y client-side para UX)  
- Tests mínimos significativos (backend y frontend)  
- Deploy (Render + Vercel)

## API
Base URL (local): `http://127.0.0.1:8000`  
Base URL (deploy): `https://entrevistatecnica.onrender.com`

### Test: `GET /health`
Chequeo simple del servicio.

**200 Response**
```json```
{ "status": "ok" }


## Configuracion (Instancia local)

## Backend
Requiere:
    - Python 3.11+
    - Node.js 18+
0. Clonar repositorio de GitHub (git clone `https://github.com/AgustinScarafioca/entrevistaTecnica.git`)
1. Posicionarse en carpeta de backend (cd entrevistaTecnica cd backend)
2. Instalar dependencias corriendo desde una consola "pip install -r requirements.txt"
3. Configurar variables de entorno (crear file .env en raiz de backend): 
    - ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
    - DATABASE_URL=sqlite:///./app.db (en local usamos por default sqlite)
4. Levantar el backend con el commando desde la carpeta backend "uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"
    - Verificar funcionamiento chequeando que devuelva un status:ok la ruta `http://127.0.0.1:8000/health`
    - Tambien podemos verificar en la ruta `http://127.0.0.1:8000/docs`

## FrontEnd
5. Posicionarse en la carpeta de frontEnd desde otra consola: cd frontend
6. Instalar dependencias corriendo npm install
7. Crear archivo .env y completar con puerto donde se levanta el backend
    - Por comando de arriba: "VITE_API_URL=http://127.0.0.1:8000"
8. Levantar frontend corriendo: "npm run dev"
    - Una vez corriendo se mostrara el puerto local donde se correra la aplicacion.
9. Entrar a la aplicacion con el url/localhost proporcionado por la consola.

> **Nota**: Es posible, para evitar instalar las dependencias de python crear un venv corriendo dentro de la carpeta del backend:
> ```bash
> python -m venv .venv
> source .venv/Scripts/activate  # (Solo desde Git Bash)
> ```

## Modo de uso (local y deploy)
Simplemente completar los datos requeridos por el formulario en pantalla para añadir entradas a la lista de personas.

## Tests

### BackEnd
```bash```
- cd backend
- pytest -q

### FrontEnd:
```bash```
- cd frontend
- npm run test:run
