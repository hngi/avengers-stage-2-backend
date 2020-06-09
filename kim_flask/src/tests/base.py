import unittest
from src.app import create_app, db
from src.config import TestingConfig


class AuthTestCaseSetup(unittest.TestCase):
    """Test case for the authentication blueprint."""

    def setUp(self):
        """Set up test variables."""
        self.app = create_app(TestingConfig)
        # initialize the test client
        self.client = self.app.test_client

        self.app_context = self.app.app_context()
        self.app_context.push()
        # create all tables
        
        db.drop_all()
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
if __name__ == "__main__":
    unittest.main()