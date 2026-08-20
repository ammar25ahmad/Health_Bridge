from pydantic import BaseModel
from typing import Optional


class ResourceRequest(BaseModel):
    name: str
    description: str
    category: str


class ContentRequest(BaseModel):
    text: str
    content_type: Optional[str] = "general"


class RelevanceRequest(BaseModel):
    text: str
    keywords: Optional[list[str]] = None
