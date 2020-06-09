from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from src.app.models.base import Base
from src.app import db

class User(Base):
    __tablename__ = 'auth_user'
    public_id = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(192), nullable=False)
    email_confirmation_sent_on = db.Column(db.DateTime, nullable=True)
    email_confirmed = db.Column(db.Boolean, nullable=True, default=False)
    email_confirmed_on = db.Column(db.DateTime, nullable=True)
