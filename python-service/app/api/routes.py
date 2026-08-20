from fastapi import APIRouter
from app.models.resource import ResourceRequest, ContentRequest, RelevanceRequest
from app.services.health_resource_analyzer import HealthResourceAnalyzer
from app.services.content_classifier import ContentClassifier
from app.services.resource_search_engine import ResourceSearchEngine
from app.utils.scoring import calculate_weighted_score

router = APIRouter()

analyzer = HealthResourceAnalyzer()
classifier = ContentClassifier()
search_engine = ResourceSearchEngine()


@router.post("/analyze-resource")
def analyze_resource(req: ResourceRequest):
    resource_data = {
        "name": req.name,
        "description": req.description,
        "category": req.category,
    }
    category = analyzer.classify_resource(resource_data)
    relevance = analyzer.calculate_relevance(resource_data)
    resource_type = analyzer.RESOURCE_TYPES.get(category.lower(), "Community Health Resource")

    return {
        "category": category,
        "resourceType": resource_type,
        "relevanceScore": relevance,
    }


@router.post("/classify-content")
def classify_content(req: ContentRequest):
    category = classifier.categorize_text(req.text)
    keywords = classifier.extract_keywords(req.text)
    quality = classifier.get_content_quality_score(req.text)

    return {
        "category": category,
        "keywords": keywords,
        "qualityScore": quality,
    }


@router.post("/calculate-relevance")
def calculate_relevance(req: RelevanceRequest):
    analyzer2 = HealthResourceAnalyzer()
    resource_data = {
        "name": req.text[:50],
        "description": req.text,
        "category": "",
    }
    score = analyzer2.calculate_relevance(resource_data)
    quality = classifier.get_content_quality_score(req.text)
    weighted = calculate_weighted_score({"relevance": score, "quality": quality})

    return {
        "relevanceScore": score,
        "qualityScore": quality,
        "weightedScore": weighted,
    }


@router.post("/search-resources")
def search_resources(req: ContentRequest):
    results = search_engine.search(req.text)
    return {
        "query": req.text,
        "results": results,
        "count": len(results),
    }
