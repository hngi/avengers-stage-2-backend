from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from src.config import DevelopmentConfig, TestingConfig
from flask_migrate import Migrate
from flask_mail import Mail

import logging
from logging.handlers import RotatingFileHandler
import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()

def create_app(config_class=TestingConfig):
    app = Flask(__name__)

    # Setup configurations
    app.config.from_object(config_class)

    # Import blueprints
    from src.app.blueprints.api_v1.controllers import api_v1_bp
    from src.app.blueprints.errors.handlers import errors_bp
    from src.app.blueprints.auth.routes import auth_bp

    # Register blueprints
    app.register_blueprint(errors_bp)
    app.register_blueprint(api_v1_bp, url_prefix='/api_v1')
    app.register_blueprint(auth_bp, url_prefix="/auth")

    #setup flask instance extensions
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    with app.app_context():
        db.create_all()
    

    if not app.debug and not app.testing:
        # enable logging
        if not os.path.exists('logs'):
            os.mkdir('logs')

        APP_NAME = os.environ.get('APP_NAME')
        file_handler = RotatingFileHandler(
            f'logs/{APP_NAME}.log', maxBytes=10240, backupCount=10)

        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(messages)s [in %(pathname)s:%(lineno)d]'))

        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info(f'{APP_NAME} startup')

    return app
