class ContentClassifier:
    """Classifies health content into categories and extracts key information."""

    TOPIC_INDICATORS = {
        "Nutrition": ["food", "diet", "eat", "nutrition", "vitamin", "mineral", "calorie", "protein", "fiber"],
        "Hygiene": ["wash", "clean", "hygiene", "sanitiz", "soap", "germ", "bacteria"],
        "Vaccination": ["vaccine", "immuniz", "inoculat", "dose", "booster", "shot"],
        "First Aid": ["first aid", "emergency", "wound", "burn", "bleed", "cpr", "choking"],
        "Preventive Care": ["prevent", "screening", "checkup", "early detect", "risk factor"],
        "Healthy Lifestyle": ["exercise", "sleep", "stress", "mental health", "fitness", "wellness"],
    }

    def categorize_text(self, text: str) -> str:
        """Categorize a block of text into a health topic."""
        text_lower = text.lower()
        scores = {}
        for topic, indicators in self.TOPIC_INDICATORS.items():
            score = sum(1 for ind in indicators if ind in text_lower)
            scores[topic] = score
        if max(scores.values()) > 0:
            return max(scores, key=scores.get)
        return "General Health"

    def extract_keywords(self, text: str, max_keywords: int = 10) -> list:
        """Extract relevant health keywords from text."""
        stop_words = {
            "the", "is", "at", "which", "on", "a", "an", "and", "or", "but", "in",
            "with", "to", "for", "of", "not", "no", "can", "had", "has", "have",
            "it", "its", "this", "that", "are", "was", "were", "be", "been", "being",
            "do", "does", "did", "will", "would", "could", "should", "may", "might",
            "shall", "should", "must", "than", "then", "so", "if", "when", "where",
            "how", "what", "which", "who", "whom", "from", "by", "as", "into",
        }
        words = text.lower().split()
        health_words = [w for w in words if len(w) > 3 and w.isalpha() and w not in stop_words]
        word_freq = {}
        for word in health_words:
            word_freq[word] = word_freq.get(word, 0) + 1
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [w[0] for w in sorted_words[:max_keywords]]

    def get_content_quality_score(self, text: str) -> float:
        """Rate the quality of health content on a 0-1 scale."""
        score = 0.0
        if len(text) > 100:
            score += 0.3
        if len(text) > 300:
            score += 0.2
        sentences = text.split(".")
        if len(sentences) > 3:
            score += 0.2
        has_numbers = any(c.isdigit() for c in text)
        if has_numbers:
            score += 0.15
        lower_text = text.lower()
        if any(w in lower_text for w in ["should", "recommend", "important", "benefit"]):
            score += 0.15
        return round(min(score, 1.0), 2)
