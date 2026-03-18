# Build frontend and prepare backend for single-process deployment
Set-Location $PSScriptRoot\..

Write-Host "Building frontend..."
Set-Location frontend
bun run build
Set-Location ..

Write-Host "Copying to backend/static..."
New-Item -ItemType Directory -Force -Path backend\static | Out-Null
Copy-Item -Path frontend\dist\* -Destination backend\static\ -Recurse -Force

Write-Host "Done. Run: cd backend; uv run uvicorn main:app --host 0.0.0.0 --port 8000"
