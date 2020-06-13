from src.tests.base import AuthTestCaseSetup
import json
import pytest
import uuid
import datetime



class TestingUserAuth(AuthTestCaseSetup):
        
    def test_registeration(self):
        
        response = self.client().post('/auth/register', data= json.dumps(dict(public_id=str(uuid.uuid4()), first_name='kim',last_name='pam', email='kim@gmail.com', password_hash='1234',email_confirmation_sent_on=None )), content_type='application/json')
        result = json.loads(response.data.decode())
        self.assertEqual(result['message'], 'Thanks for registering. Please check your email to confirm your email address')
        self.assertEqual(response.status_code, 201)

    def test_user_already_exist(self):
        response = self.client().post('/auth/register', data= json.dumps(dict(public_id=str(uuid.uuid4()), first_name='kim',last_name='pam', email='kim@gmail.com', password_hash='1234',email_confirmation_sent_on=None )), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        second_response = self.client().post('/auth/register', data= json.dumps(dict(public_id=str(uuid.uuid4()), first_name='kim',last_name='pam', email='kim@gmail.com', password_hash='1234',email_confirmation_sent_on=None )), content_type='application/json')
        self.assertEqual(second_response.status_code, 202)
        result = json.loads(second_response.data.decode())
        self.assertEqual(result['message'], 'User already exist')

    
        
