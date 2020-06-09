import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class DevelopmentConfig(object):
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DEV_DATABASE_URL') or 'sqlite:///' + os.path.join(BASE_DIR, 'development.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DATABASE_CONNECT_OPTIONS = {}

    DEBUG = True

    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2

    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = True

    # Use a secure, unique and absolutely secret key for
    # signing the data.
    CSRF_SESSION_KEY = os.environ.get('CSRF_SESSION_KEY') or "super-secret"

    # Secret key for signing cookies
    SECRET_KEY = os.environ.get('SECRET_KEY') or "this-should-be-a-secret"

    #flask mail config
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = os.environ.get('MAIL_PORT') or 587
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') or True
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL') or False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'email@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or "passworg"


    ADMIN = "email@gmail.com"


class TestingConfig(DevelopmentConfig):
    TESTING = True
    
    # This uses an in-memory SQLite database without opening a disk file
    SQLALCHEMY_DATABASE_URI =  'sqlite:///' 
    

# Remember to setup a deployment config class

app_config = {
    "development": DevelopmentConfig,
    "testing" : TestingConfig,
}