"""Seed the database with sample data."""
from database import init_db, SessionLocal
from models import Item


def seed():
    init_db()
    db = SessionLocal()
    try:
        if db.query(Item).count() == 0:
            db.add_all([
                Item(name="Test Item 1", description="First sample item"),
                Item(name="Test Item 2", description="Second sample item"),
            ])
            db.commit()
            print("Seeded 2 sample items.")
        else:
            print("Database already has data, skipping seed.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
