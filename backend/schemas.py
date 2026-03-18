"""Pydantic schemas."""
from datetime import datetime

from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True
