# Flabs — VPS Test Stack

A minimal React + FastAPI + SQLite project to test running your stack on a VPS.

## Local Development

### Backend

```bash
cd backend
uv sync
uv run python seed.py          # Optional: add sample data
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
bun install
bun run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:8000  
- Health: http://localhost:8000/api/health  
- API docs: http://localhost:8000/docs  

The Vite dev server proxies `/api` to the backend, so CORS is handled automatically.

---

## Deploying on Your VPS

### 1. Install dependencies on the server

```bash
# uv (Python)
curl -LsSf https://astral.sh/uv/install.sh | sh

# bun (Node)
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone and build

```bash
git clone <your-repo> flabs
cd flabs
```

**Backend:**
```bash
cd backend
uv sync
uv run python seed.py
```

**Frontend:**
```bash
cd frontend
bun install
bun run build
```

### 3. Run in production

**Option A — Simple (for testing)**

```bash
# Terminal 1: Backend
cd backend && uv run uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 2: Serve frontend static files
cd frontend && bunx serve -s dist -l 3000
```

Then visit `http://YOUR_VPS_IP:3000`. The frontend will try to reach `/api` on the same origin — you’ll need to either serve both from one process or set `VITE_API_URL` before building (see below).

**Option B — Single process (easiest for testing)**

Serve the built React app from FastAPI — one command, one port:

```bash
# Build frontend, then copy to backend
cd frontend && bun run build
cp -r dist/* ../backend/static/   # create backend/static first: mkdir -p ../backend/static

# Run (serves both API and frontend on port 8000)
cd ../backend && uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

Visit `http://YOUR_VPS_IP:8000` — API at `/api`, frontend at `/`.

**Option C — Nginx reverse proxy (recommended for real use)**

- Nginx serves the frontend static files and proxies `/api` to the FastAPI backend
- Use systemd to keep the backend running
- Add SSL with Let’s Encrypt

### 4. Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL. Set before `bun run build` if frontend and backend are on different origins (e.g. `https://api.yourdomain.com`). |

### 5. Firewall

```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80   # HTTP
sudo ufw allow 443  # HTTPS
sudo ufw enable
```

---

## Project structure

```
flabs_alpha/
├── backend/
│   ├── main.py       # FastAPI app
│   ├── database.py   # SQLite + SQLAlchemy
│   ├── models.py     # Item model
│   ├── schemas.py    # Pydantic schemas
│   ├── seed.py       # Sample data
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
└── README.md
```
