# HealthBridge Python Service

## Overview
The Python microservice provides OOP-based health resource analysis using FastAPI.

## Structure
```
python-service/
├── app/
│   ├── main.py              # FastAPI app
│   ├── api/
│   │   └── routes.py        # API endpoints
│   ├── models/
│   │   └── resource.py      # Pydantic models
│   ├── services/
│   │   ├── health_resource_analyzer.py  # Main analyzer class
│   │   ├── content_classifier.py        # Content classifier
│   │   └── resource_search_engine.py    # Search engine
│   └── utils/
│       └── scoring.py       # Scoring utilities
├── requirements.txt
└── Dockerfile
```

## OOP Classes

### HealthResourceAnalyzer
- `classify_resource(resource)` - Classifies resource into health category
- `calculate_relevance(resource)` - Scores resource completeness (0-1)
- `categorize_content(content)` - Categorizes text into health topic

### ContentClassifier
- `categorize_text(text)` - Categorizes text into health topics
- `extract_keywords(text)` - Extracts relevant health keywords
- `get_content_quality_score(text)` - Rates content quality (0-1)

### ResourceSearchEngine
- `search(query, category)` - Searches resources with scoring
- `rank_results(results)` - Ranks results by relevance

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service info |
| `/health` | GET | Health check |
| `/analyze-resource` | POST | Analyze a health resource |
| `/classify-content` | POST | Classify content into health topic |
| `/calculate-relevance` | POST | Calculate relevance score |
| `/search-resources` | POST | Search resources |

## Integration
The Node.js resource-service calls the Python service when a new resource is created. The Python service analyzes the resource and returns:
- Category classification
- Resource type
- Relevance score

These results are stored with the resource document in MongoDB.

## Running
```bash
cd python-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
