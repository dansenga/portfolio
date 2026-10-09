#!/bin/bash

# ============================================================
# DAN SENGA PORTFOLIO - SERVER RUNNER
# Starts both Backend and Frontend on local WiFi network
# ============================================================

# Get absolute path to the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Detect local IP
LOCAL_IP=$(hostname -I | awk '{print $1}')
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP="127.0.0.1"
fi

echo "===================================================="
echo "⚡ Starting Dan Senga's Premium Portfolio..."
echo "📶 Local WiFi IP: http://$LOCAL_IP:5173"
echo "🔌 Backend API  : http://$LOCAL_IP:8000/api"
echo "===================================================="

# Use the backend virtual environment explicitly so the script does not
# depend on whichever uvicorn executable happens to be on PATH.
BACKEND_DIR="$SCRIPT_DIR/backend"
VENV_DIR="$BACKEND_DIR/.venv"
PYTHON="$VENV_DIR/bin/python"

if [ ! -x "$PYTHON" ]; then
  echo "❌ Backend virtual environment not found: $VENV_DIR"
  echo "Create it with: python3 -m venv $VENV_DIR"
  exit 1
fi

if ! "$PYTHON" -m pip --version >/dev/null 2>&1; then
  echo "📦 Bootstrapping pip in the backend virtual environment..."
  "$PYTHON" -m ensurepip --upgrade --default-pip || {
    echo "❌ Could not install pip in $VENV_DIR."
    echo "Recreate the environment with: python3 -m venv $VENV_DIR"
    exit 1
  }
fi

if ! "$PYTHON" -c "import uvicorn" >/dev/null 2>&1; then
  echo "📦 Installing backend dependencies..."
  "$PYTHON" -m pip install -r "$BACKEND_DIR/requirements.txt" || {
    echo "❌ Failed to install backend dependencies."
    exit 1
  }
fi

# Cleanup handler to stop both servers when Ctrl+C is pressed
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Start Backend (FastAPI + SQLite)
echo "🚀 Launching FastAPI Backend on port 8000..."
cd "$BACKEND_DIR"
"$PYTHON" -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# 2. Start Frontend (Vite + React)
echo "🚀 Launching Vite Frontend on port 5173..."
cd "$SCRIPT_DIR/frontend"
npm run dev -- --host &
FRONTEND_PID=$!

# Wait for both processes
wait
