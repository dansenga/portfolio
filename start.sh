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
cd "$SCRIPT_DIR/backend"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# 2. Start Frontend (Vite + React)
echo "🚀 Launching Vite Frontend on port 5173..."
cd "$SCRIPT_DIR/frontend"
npm run dev -- --host &
FRONTEND_PID=$!

# Wait for both processes
wait
