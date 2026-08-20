# HealthBridge Agent Architecture

## Overview
The Health Resource Agent is an AI-powered search assistant that helps users find health resources, articles, and categories using intelligent tool selection.

## Tools

### 1. search_resources(query, category)
- Searches the resource-service API for approved health resources
- Filters by text query and optional category
- Returns matching resources with details

### 2. search_health_articles(query, category)
- Searches the resource-service API for educational articles
- Filters by text query and optional category
- Returns matching articles

### 3. get_resource_categories()
- Returns the list of available resource categories
- Used when the agent needs to show available options

## Agent Workflow

```
User Input
    ↓
Intent Detection
    ↓
Category Mapping
    ↓
Tool Selection (parallel execution)
    ↓
Tool Results Aggregation
    ↓
Response Generation
    ↓
User Output (resources + articles + tool call log)
```

### Intent Detection
The agent parses the user's message to:
1. Extract the search query (remove common prefixes like "I need", "find", "search for")
2. Detect the relevant category using keyword matching
3. Determine which tools to call

### Category Mapping
Keywords are mapped to resource categories:
- "vaccination", "vaccine", "immunization" → Vaccination Centers
- "clinic", "doctor" → Clinics
- "emergency" → Emergency Contacts
- "mental", "counseling" → Mental Wellness
- "preventive", "screening" → Preventive Care
- "program", "community" → Public Health Programs

### Parallel Execution
All three tools are called simultaneously for maximum speed. Results are aggregated into a unified response.

## Example

**User**: "I need vaccination resources"

**Agent Processing**:
1. Detect category: "Vaccination Centers"
2. Extract query: "vaccination"
3. Execute tools:
   - search_resources("vaccination", "Vaccination Centers") → 2 results
   - search_health_articles("vaccination") → 1 result
   - get_resource_categories() → 6 categories
4. Generate response with resources, articles, and tool call log

**Response**:
```
I found 2 resource(s) and 1 article(s) related to "vaccination".

Health Resources:
1. City Community Vaccination Center (Vaccination Centers) | Contact: +1-555-0101

Related Articles:
1. Understanding Vaccination Basics (Vaccination)

Tool calls executed:
✓ search_resources (2 results)
✓ search_health_articles (1 result)
✓ get_resource_categories (6 categories)
```
