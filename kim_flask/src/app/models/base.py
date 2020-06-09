from src.app import db
from datetime import datetime

class Base(db.Model):
    """
    Base model to be inherited by other database tables
    """
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    
    date_modified = db.Column(
        db.DateTime, onupdate=datetime.utcnow)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()