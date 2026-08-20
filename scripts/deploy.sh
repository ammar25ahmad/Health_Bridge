#!/bin/bash

set -e

echo "========================================="
echo "  HealthBridge - Deploy"
echo "========================================="

echo ""
echo "[1/3] Building Docker containers..."
docker compose build

echo ""
echo "[2/3] Starting containers..."
docker compose up -d

echo ""
echo "[3/3] Checking service status..."
sleep 5
docker compose ps

echo ""
echo "========================================="
echo "  HealthBridge is running!"
echo "========================================="
echo ""
echo "  Frontend:  http://localhost:5173"
echo "  Gateway:   http://localhost:5000"
echo "  Auth:      http://localhost:5001"
echo "  Resource:  http://localhost:5002"
echo "  AI:        http://localhost:5003"
echo "  Python:    http://localhost:8000"
echo "  MongoDB:   localhost:27017"
echo ""
echo "To stop: docker compose down"
echo "To view logs: docker compose logs -f"
