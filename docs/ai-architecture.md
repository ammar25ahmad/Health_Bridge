# AI Architecture

## Overview
HealthBridge uses three AI capabilities:
1. **Generative AI** - Health Education Assistant
2. **RAG** - Retrieval-Augmented Generation with knowledge base
3. **Agentic AI** - Health Resource Agent with tools

## Generative AI (Health Education Assistant)
- Uses Google Gemini API for generating health education responses
- Falls back to template-based responses if no API key is configured
- Every response includes a health disclaimer
- Refuses to diagnose or prescribe

## RAG (Retrieval-Augmented Generation)

### Knowledge Base
Located in `rag/knowledge-base/`:
- vaccination.md
- nutrition.md
- hygiene.md
- first-aid.md
- preventive-care.md
- healthy-lifestyle.md
- public-health-guidelines.md

### Pipeline
1. User asks a question
2. Question is tokenized and converted to TF-IDF vector
3. Top-3 most relevant chunks are retrieved from knowledge base
4. Retrieved context is injected into the LLM prompt
5. LLM generates a grounded response
6. Source filenames are returned to the frontend

### Retrieval Algorithm
- TF-IDF (Term Frequency - Inverse Document Frequency)
- Cosine similarity for ranking
- Document chunking with 500-word chunks and 100-word overlap

## Agentic AI (Health Resource Agent)

### Tools
1. **search_resources** - Searches approved health resources by query and category
2. **search_health_articles** - Searches educational articles
3. **get_resource_categories** - Returns available resource categories

### Agent Logic
1. Parse user intent from the message
2. Detect relevant category from keywords
3. Execute appropriate tools in parallel
4. Aggregate results from all tools
5. Generate a structured response with resources and articles

### Example Flow
```
User: "I need vaccination resources"
  → detectCategory: "Vaccination Centers"
  → extractSearchQuery: "vaccination resources"
  → searchResources("vaccination resources", "Vaccination Centers")
  → searchArticles("vaccination", "Vaccination")
  → getResourceCategories()
  → aggregateResults()
  → generateResponse()
```

## Safety Rules
- Never diagnose diseases
- Never prescribe medications
- Always include disclaimer
- Emergency situations → redirect to emergency services
- Insufficient knowledge → state limitation and recommend professional
