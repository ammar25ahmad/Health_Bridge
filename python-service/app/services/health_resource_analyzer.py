class HealthResourceAnalyzer:
    """Main analyzer for health resources using OOP principles."""

    CATEGORY_KEYWORDS = {
        "vaccination": ["vaccine", "vaccination", "immunization", "flu shot", "booster"],
        "clinics": ["clinic", "primary care", "doctor", "physician", "medical center"],
        "emergency": ["emergency", "urgent", "911", "ambulance", "crisis", "hotline"],
        "mental wellness": ["mental health", "counseling", "therapy", "stress", "anxiety", "depression"],
        "preventive care": ["screening", "preventive", "checkup", "check-up", "diabetes", "blood pressure"],
        "public health": ["community", "program", "initiative", "public health", "wellness"],
    }

    RESOURCE_TYPES = {
        "vaccination": "Vaccination Service",
        "clinics": "Primary Care Facility",
        "emergency": "Emergency Service",
        "mental wellness": "Mental Health Support",
        "preventive care": "Screening Facility",
        "public health": "Community Health Program",
    }

    def classify_resource(self, resource: dict) -> str:
        """Classify a resource into a health category based on its content."""
        text = f"{resource.get('name', '')} {resource.get('description', '')} {resource.get('category', '')}".lower()
        scores = {}
        for category, keywords in self.CATEGORY_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in text)
            scores[category] = score
        if max(scores.values()) > 0:
            return max(scores, key=scores.get).title()
        return resource.get("category", "General Health Resource")

    def calculate_relevance(self, resource: dict) -> float:
        """Calculate a relevance score based on resource completeness and quality."""
        score = 0.0
        if resource.get("name") and len(resource["name"]) > 5:
            score += 0.25
        if resource.get("description") and len(resource["description"]) > 20:
            score += 0.25
        if resource.get("category"):
            score += 0.2
        if resource.get("location"):
            score += 0.15
        if resource.get("contactInformation"):
            score += 0.15
        return round(min(score, 1.0), 2)

    def categorize_content(self, content: str) -> str:
        """Categorize text content into a health topic."""
        text = content.lower()
        health_topics = {
            "vaccination": ["vaccine", "immunization", "dose", "booster"],
            "nutrition": ["nutrition", "diet", "food", "vitamin", "protein", "calories"],
            "hygiene": ["hygiene", "wash", "clean", "sanitize", "hand"],
            "first aid": ["first aid", "emergency", "wound", "burn", "cpr"],
            "preventive care": ["preventive", "screening", "checkup", "early detection"],
            "healthy lifestyle": ["exercise", "sleep", "stress", "wellness", "fitness"],
        }
        scores = {}
        for topic, keywords in health_topics.items():
            score = sum(1 for kw in keywords if kw in text)
            scores[topic] = score
        if max(scores.values()) > 0:
            return max(scores, key=scores.get).title()
        return "General Health"
