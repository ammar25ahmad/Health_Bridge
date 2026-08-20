def calculate_weighted_score(scores: dict, weights: dict = None) -> float:
    """Calculate a weighted average from multiple score components."""
    if not scores:
        return 0.0
    if weights is None:
        weights = {k: 1.0 for k in scores}
    total_weight = sum(weights.get(k, 1.0) for k in scores)
    if total_weight == 0:
        return 0.0
    weighted_sum = sum(scores[k] * weights.get(k, 1.0) for k in scores)
    return round(weighted_sum / total_weight, 2)


def normalize_score(score: float, min_val: float = 0, max_val: float = 1) -> float:
    """Normalize a score to 0-1 range."""
    if max_val == min_val:
        return 0.5
    normalized = (score - min_val) / (max_val - min_val)
    return round(max(0, min(1, normalized)), 2)
