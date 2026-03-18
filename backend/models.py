"""SQLAlchemy models."""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base


class Item(Base):
    """Simple item model for testing."""

    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
