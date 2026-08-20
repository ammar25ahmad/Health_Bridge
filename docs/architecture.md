# HealthBridge Architecture

## System Architecture

```
React Frontend (Bun/Vite/JSX) :5173
        |
   Vite Proxy
        |
   API Gateway (Express) :5000
        |
   +-----------+------------+--------------+
   |           |            |              |
auth-service  resource-service  ai-service
:5001         :5002            :5003
                                      |
                                  python-service (FastAPI) :8000
                                      |
                                  MongoDB (Docker) :27017
```

## Component Overview

### Frontend
- **Technology**: React 19, Vite 8, Tailwind CSS 4, React Router 7
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Axios with credentials
- **Package Manager**: Bun

### API Gateway
- Central entry point for all frontend API requests
- Routes requests to appropriate microservices
- Handles CORS, rate limiting, error formatting
- Forwards authentication cookies to services

### Auth Service
- User registration and login
- JWT token generation and validation
- Password hashing with bcrypt
- HTTP-only cookie-based authentication
- Role-based access control (CITIZEN, ORGANIZATION, ADMIN)

### Resource Service
- CRUD operations for health resources
- CRUD operations for educational articles
- Question management
- Search and filtering
- Resource approval workflow (PENDING → APPROVED/REJECTED)
- Python service integration for resource analysis

### AI Service
- **Generative AI**: Google Gemini API integration with fallback responses
- **RAG Pipeline**: TF-IDF based knowledge retrieval from markdown files
- **Health Resource Agent**: Tool-based agent with search_resources, search_health_articles, get_resource_categories

### Python Service
- FastAPI microservice with OOP architecture
- **HealthResourceAnalyzer**: Resource classification and relevance scoring
- **ContentClassifier**: Content categorization and keyword extraction
- **ResourceSearchEngine**: Search and ranking

## Data Flow

### Authentication Flow
```
User → Login Form → API Gateway → Auth Service → MongoDB
     ← JWT Cookie ← API Gateway ← Auth Service ←
```

### Resource Creation Flow
```
Org User → Create Form → API Gateway → Resource Service → Python Service
         ← Success ← API Gateway ← Resource Service ← Analysis Result
```

### RAG Query Flow
```
User Question → AI Service → Retrieve Knowledge Base → LLM/Gemini
             ← Grounded Answer + Sources ← AI Service ←
```

### Agent Flow
```
User Request → AI Service → Agent Parser
            → Tool Selection → Tool Execution (Resource/Article Search)
            → Result Aggregation → Response Generation
```

## Security
- JWT in HTTP-only cookies (not accessible via JavaScript)
- bcrypt password hashing (12 rounds)
- Role-based authorization (verified server-side)
- CORS restricted to frontend origin
- Helmet security headers
- Rate limiting on API Gateway
- Input validation with Zod (Node) and Pydantic (Python)
