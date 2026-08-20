# HealthBridge

**AI-Powered Community Health Information & Support Platform**

Built for the LoopLearn Hackathon 2026

---

## Problem Statement

Citizens often struggle to find reliable health information, educational content, and community health resources. HealthBridge addresses this by providing an AI-powered platform that connects citizens with verified health resources and educational content.

## SDG Alignment

- **SDG 3**: Good Health and Well-Being
- **SDG 10**: Reduced Inequalities (health access for all)
- **SDG 11**: Sustainable Communities (community health resources)

## Features

### For Citizens
- Search and filter health resources (clinics, vaccination centers, etc.)
- Browse health education articles
- AI Health Education Assistant with RAG
- Health Resource Agent with intelligent tool execution
- Ask questions about health topics

### For Organizations
- Create and manage health resources
- Add educational content
- Track resource status

### For Admins
- Dashboard with platform statistics
- Approve/reject resources
- Manage users and content

## Architecture

```
React (Bun/Vite/JSX) :5173
        ↓
   API Gateway (Express) :5000
        ↓
   +-----------+------------+--------------+
   |           |            |              |
auth-service  resource-service  ai-service
:5001         :5002            :5003
                                      ↓
                                  python-service (FastAPI) :8000
                                      ↓
                                  MongoDB (Docker) :27017
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, JSX |
| Package Manager | Bun (frontend), npm (backend) |
| Backend | Node.js, Express.js, JavaScript |
| Database | MongoDB with Mongoose |
| Python Service | Python 3.11+, FastAPI, Pydantic |
| AI | Google Gemini API, RAG, Agent |
| Authentication | JWT, bcrypt, HTTP-only cookies |
| Validation | Zod (Node), Pydantic (Python) |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes |
| IaC | Terraform |
| CI/CD | Git/GitHub |

## Folder Structure

```
Health_Bridge/
├── frontend/              # React frontend (Bun/Vite/JSX)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── organization/  # Organization dashboard pages
│   │   ├── api/           # API client modules
│   │   ├── store/         # Auth state management
│   │   └── hooks/         # Custom React hooks
│   └── package.json
├── api-gateway/           # Express API gateway
│   └── src/
├── auth-service/          # Authentication microservice
│   └── src/
├── resource-service/      # Resource & article management
│   └── src/
├── ai-service/            # AI service (RAG, Agent)
│   └── src/
├── python-service/        # Python OOP analyzer
│   └── app/
├── rag/                   # RAG knowledge base
│   └── knowledge-base/
├── kubernetes/            # K8s manifests
├── terraform/             # IaC configuration
├── scripts/               # Setup & deploy scripts
├── docs/                  # Documentation
├── docker-compose.yml
└── .env.example
```

## Installation

### Prerequisites
- Node.js 18+
- Bun (for frontend)
- Python 3.11+
- Docker & Docker Compose
- Google Gemini API key (free from https://aistudio.google.com/apikey)

### Quick Start with Docker
```bash
# Clone and configure
git clone https://github.com/ammar25ahmad/Health_Bridge.git
cd Health_Bridge
cp .env.example .env
# Edit .env and add your LLM_API_KEY

# Start everything
docker compose up --build

# Seed database (in another terminal)
docker compose exec resource-service node src/seed.js
```

### Manual Setup
```bash
# 1. Start MongoDB
docker run -d --name healthbridge-mongo -p 27017:27017 -v mongo-data:/data/db mongo:7

# 2. Seed database
cd resource-service && npm install && npm run seed && cd ..

# 3. Install and start services (each in a separate terminal)
cd auth-service && npm install && npm run dev
cd resource-service && npm install && npm run dev
cd ai-service && npm install && npm run dev
cd api-gateway && npm install && npm run dev

# 4. Start frontend
cd frontend && bun install && bun run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/healthbridge |
| JWT_SECRET | JWT signing secret | (set in .env) |
| GATEWAY_PORT | API Gateway port | 5000 |
| AUTH_SERVICE_URL | Auth service URL | http://localhost:5001 |
| RESOURCE_SERVICE_URL | Resource service URL | http://localhost:5002 |
| AI_SERVICE_URL | AI service URL | http://localhost:5003 |
| PYTHON_SERVICE_URL | Python service URL | http://localhost:8000 |
| LLM_API_KEY | Google Gemini API key | (empty = fallback mode) |
| VITE_API_URL | Frontend API URL | http://localhost:5000 |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@healthbridge.local | demo123 |
| Organization | organization@healthbridge.local | demo123 |
| Citizen | citizen@healthbridge.local | demo123 |

## AI Architecture

### Generative AI
- Google Gemini API for health education responses
- Template-based fallback when no API key is configured
- Safety disclaimers on all health responses

### RAG (Retrieval-Augmented Generation)
- 7 knowledge-base markdown files covering health topics
- TF-IDF based retrieval (no external vector DB needed)
- Top-3 relevant chunks retrieved per query
- Sources displayed in the UI

### Health Resource Agent
- 3 tools: search_resources, search_health_articles, get_resource_categories
- Intent detection and category mapping
- Parallel tool execution
- Structured response with resources, articles, and tool call log

## Python Service

- FastAPI microservice with OOP architecture
- `HealthResourceAnalyzer`: Resource classification and relevance scoring
- `ContentClassifier`: Content categorization and keyword extraction
- `ResourceSearchEngine`: Search and ranking
- Node.js calls Python service when resources are created

## API Documentation

See [docs/api.md](docs/api.md) for complete API documentation.

## Running Services

| Service | Command | Port |
|---------|---------|------|
| Frontend | `cd frontend && bun run dev` | 5173 |
| API Gateway | `cd api-gateway && npm run dev` | 5000 |
| Auth Service | `cd auth-service && npm run dev` | 5001 |
| Resource Service | `cd resource-service && npm run dev` | 5002 |
| AI Service | `cd ai-service && npm run dev` | 5003 |
| Python Service | `cd python-service && uvicorn app.main:app --reload` | 8000 |

## Security

- Password hashing with bcrypt (12 rounds)
- JWT in HTTP-only cookies
- Role-based authorization (verified server-side)
- CORS configuration
- Helmet security headers
- Rate limiting on API Gateway
- Input validation (Zod/Pydantic)
- No secrets in Git (.env.example provided)
- Health disclaimers on AI responses

## Future Improvements

- Real-time notifications
- User reviews and ratings on resources
- Multi-language support
- Mobile application
- Advanced NLP for better intent detection
- Vector database for improved RAG performance
- Automated resource verification
- Analytics dashboard with detailed metrics

## License

Built for LoopLearn Hackathon 2026.
