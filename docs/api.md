# HealthBridge API Documentation

## Base URL
All API requests go through the API Gateway: `http://localhost:5000/api`

## Authentication

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Citizen",
  "email": "john@example.com",
  "password": "password123",
  "role": "CITIZEN"
}
```

**Roles:** CITIZEN, ORGANIZATION (ADMIN cannot be self-registered)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": "CITIZEN" }
  }
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": "CITIZEN" }
  }
}
```

### POST /api/auth/logout
Clear authentication cookie.

### GET /api/auth/me
Get current authenticated user. Requires valid JWT cookie.

---

## Resources

### GET /api/resources
List resources with optional filters.

**Query Parameters:**
- `search` - Text search in name and description
- `category` - Filter by category
- `location` - Filter by location
- `availability` - Filter by availability
- `status` - Filter by status (PENDING, APPROVED, REJECTED, ACTIVE, INACTIVE)
- `limit` - Max results (default 50)

### GET /api/resources/:id
Get a single resource by ID.

### POST /api/resources
Create a new resource. **Requires authentication.**

**Request Body:**
```json
{
  "name": "Community Clinic",
  "category": "Clinics",
  "description": "Full-service community clinic",
  "location": "123 Main St",
  "contactInformation": "+1-555-0100",
  "availability": "Mon-Fri 8AM-5PM"
}
```

### PUT /api/resources/:id
Update a resource. **Requires authentication. Owner or ADMIN only.**

### DELETE /api/resources/:id
Delete a resource. **Requires authentication. Owner or ADMIN only.**

### PATCH /api/resources/:id/status
Update resource status. **Requires ADMIN role.**

**Request Body:** `{ "status": "APPROVED" }`

---

## Articles

### GET /api/articles
List articles. Query: `search`, `category`, `limit`.

### GET /api/articles/:id
Get a single article.

### POST /api/articles
Create article. **Requires ORGANIZATION or ADMIN role.**

### PUT /api/articles/:id
Update article. **Requires authentication.**

### DELETE /api/articles/:id
Delete article. **Requires authentication.**

---

## Questions

### POST /api/questions
Submit a question. **Requires authentication.**

### GET /api/questions
List all questions. **Requires authentication.**

### PATCH /api/questions/:id
Update a question (answer). **Requires authentication.**

---

## AI

### POST /api/ai/chat
General AI health education chat.

**Request Body:** `{ "message": "Explain hypertension prevention" }`

### POST /api/ai/rag
RAG-powered response with knowledge base retrieval.

**Request Body:** `{ "message": "What are vaccination basics?" }`

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "...",
    "sources": ["vaccination.md", "preventive-care.md"]
  }
}
```

### POST /api/ai/agent
Health Resource Agent with tool execution.

**Request Body:** `{ "message": "I need vaccination resources" }`

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "...",
    "resources": [...],
    "articles": [...],
    "toolCalls": [
      { "tool": "search_resources", "resultCount": 2 },
      { "tool": "search_health_articles", "resultCount": 3 },
      { "tool": "get_resource_categories", "resultCount": 6 }
    ]
  }
}
```

---

## Demo Accounts
- `admin@healthbridge.local` / `demo123` (ADMIN)
- `organization@healthbridge.local` / `demo123` (ORGANIZATION)
- `citizen@healthbridge.local` / `demo123` (CITIZEN)
