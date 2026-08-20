class ResourceSearchEngine:
    """Search engine for health resources with ranking capabilities."""

    def __init__(self):
        self.resources = []

    def load_resources(self, resources: list):
        """Load resources for searching."""
        self.resources = resources

    def search(self, query: str, category: str = None) -> list:
        """Search resources by query and optional category."""
        results = []
        query_lower = query.lower()
        for resource in self.resources:
            score = self._score_resource(resource, query_lower, category)
            if score > 0:
                results.append({"resource": resource, "score": score})
        results.sort(key=lambda x: x["score"], reverse=True)
        return [r["resource"] for r in results]

    def _score_resource(self, resource: dict, query: str, category: str = None) -> float:
        """Score a resource against a search query."""
        score = 0.0
        name = resource.get("name", "").lower()
        desc = resource.get("description", "").lower()
        res_category = resource.get("category", "").lower()

        if query in name:
            score += 3.0
        elif any(word in name for word in query.split()):
            score += 1.5

        if query in desc:
            score += 2.0
        elif any(word in desc for word in query.split()):
            score += 1.0

        if category and res_category == category.lower():
            score += 2.0
        elif any(word in res_category for word in query.split()):
            score += 1.0

        return score

    def rank_results(self, results: list) -> list:
        """Rank results by relevance."""
        return sorted(results, key=lambda x: x.get("score", 0), reverse=True)
