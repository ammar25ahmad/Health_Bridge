#!/bin/bash

set -e

echo "========================================="
echo "  HealthBridge - Development Setup"
echo "========================================="

echo ""
echo "[1/7] Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Install from https://nodejs.org"
    exit 1
fi
echo "  Node.js: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed."
    exit 1
fi
echo "  npm: $(npm --version)"

# Check Bun
if ! command -v bun &> /dev/null; then
    echo "ERROR: Bun is not installed. Install from https://bun.sh"
    exit 1
fi
echo "  Bun: $(bun --version)"

# Check Python
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed. Install from https://python.org"
    exit 1
fi
echo "  Python: $(python --version 2>/dev/null || python3 --version)"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "WARNING: Docker is not installed. MongoDB will need to be installed separately."
else
    echo "  Docker: $(docker --version)"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null 2>&1; then
    echo "WARNING: Docker Compose is not installed."
else
    echo "  Docker Compose: available"
fi

echo ""
echo "[2/7] Installing frontend dependencies..."
cd frontend && bun install && cd ..

echo ""
echo "[3/7] Installing auth-service dependencies..."
cd auth-service && npm install && cd ..

echo ""
echo "[4/7] Installing resource-service dependencies..."
cd resource-service && npm install && cd ..

echo ""
echo "[5/7] Installing API gateway dependencies..."
cd api-gateway && npm install && cd ..

echo ""
echo "[6/7] Installing AI service dependencies..."
cd ai-service && npm install && cd ..

echo ""
echo "[7/7] Installing Python service dependencies..."
cd python-service && pip install -r requirements.txt && cd ..

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "To start the application:"
echo "  1. Start MongoDB: docker run -d --name healthbridge-mongo -p 27017:27017 mongo:7"
echo "  2. Seed database: cd resource-service && npm run seed"
echo "  3. Start services in separate terminals:"
echo "     Terminal 1: cd auth-service && npm run dev"
echo "     Terminal 2: cd resource-service && npm run dev"
echo "     Terminal 3: cd ai-service && npm run dev"
echo "     Terminal 4: cd api-gateway && npm run dev"
echo "     Terminal 5: cd frontend && bun run dev"
echo ""
echo "  OR use Docker: docker compose up --build"
