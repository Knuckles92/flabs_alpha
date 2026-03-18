#!/bin/bash
# Build frontend and prepare backend for single-process deployment
set -e

cd "$(dirname "$0")/.."

echo "Building frontend..."
cd frontend && bun run build && cd ..

echo "Copying to backend/static..."
mkdir -p backend/static
cp -r frontend/dist/* backend/static/

echo "Done. Run: cd backend && uv run uvicorn main:app --host 0.0.0.0 --port 8000"
