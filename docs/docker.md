# Docker Deployment

## Docker Compose

### Services
| Service | Port | Description |
|---------|------|-------------|
| mongodb | 27017 | MongoDB database |
| auth-service | 5001 | Authentication microservice |
| resource-service | 5002 | Resource & article management |
| python-service | 8000 | Python OOP analyzer |
| ai-service | 5003 | AI with RAG and Agent |
| api-gateway | 5000 | Central API gateway |
| frontend | 5173 | React frontend |

### Commands

**Build and start all services:**
```bash
docker compose up --build
```

**Start in background:**
```bash
docker compose up -d
```

**View logs:**
```bash
docker compose logs -f
docker compose logs -f auth-service
```

**Stop all services:**
```bash
docker compose down
```

**Stop and remove volumes:**
```bash
docker compose down -v
```

### Environment Variables
Set `LLM_API_KEY` in `.env` file for AI features:
```
LLM_API_KEY=your-google-gemini-api-key
```

### Seed Data
After starting Docker Compose, seed the database:
```bash
docker compose exec resource-service node src/seed.js
```
