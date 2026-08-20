# HealthBridge RAG Architecture

## Overview
RAG (Retrieval-Augmented Generation) enhances AI responses by retrieving relevant information from a knowledge base before generating answers.

## Knowledge Base

### Files
Located in `rag/knowledge-base/`:

| File | Topic | Content |
|------|-------|---------|
| vaccination.md | Vaccination | How vaccines work, types, community immunity |
| nutrition.md | Nutrition | Healthy eating, food groups, daily intake |
| hygiene.md | Hygiene | Handwashing, sanitizer, when to wash |
| first-aid.md | First Aid | Cuts, burns, choking, bleeding, allergic reactions |
| preventive-care.md | Preventive Care | Screenings, checkups, health habits by age |
| healthy-lifestyle.md | Healthy Lifestyle | Exercise, sleep, stress, mental health |
| public-health-guidelines.md | Public Health | Disease prevention, community health, emergency preparedness |

## Pipeline

### 1. Document Processing
- Markdown files are loaded from the knowledge base directory
- Each file is split into chunks (500 words, 100-word overlap)
- Chunks preserve the source filename for attribution

### 2. Query Processing
- User question is tokenized (lowercase, remove special chars, filter stop words)
- TF-IDF vector is computed for the query

### 3. Retrieval
- All document chunks are converted to TF-IDF vectors
- Cosine similarity is computed between query and each chunk
- Top-3 most similar chunks are selected

### 4. Generation
- Retrieved context is injected into the system prompt
- The LLM generates a response grounded in the retrieved documents
- Source filenames are included in the response

### 5. Display
- Frontend shows the AI answer
- Source files are displayed below the answer
- Users can see which knowledge base documents were used

## Example

**Query**: "What is hypertension prevention?"

**Retrieved Chunks**: From `preventive-care.md` and `healthy-lifestyle.md`

**Response**: Educational information about blood pressure management with sources displayed.

## No External Vector Database
For the MVP, RAG uses in-memory TF-IDF matching. No external vector database (Pinecone, Weaviate, etc.) is needed. This keeps the prototype simple and self-contained.
