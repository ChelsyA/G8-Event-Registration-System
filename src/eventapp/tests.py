from django.urls import reverse
from rest_framework.test import APITestCase
from .models import User, Event
from rest_framework import status

class UserTest(APITestCase):
    def test_register_user(self):
        """
        Ensure we can register or create a new user and return user's info and token generated
        """
        data = {
            'username': 'joe',
            'email': 'joe@octavents.com',
            'first_name': 'Theo',
            'last_name': 'Chelsy',
            'address': 'P.O. BoxCD3, Akosombo',
            'city': 'Akosombo',
            'phone_number': '0501395590',
            'password': 'azubipassword',
            'password2': 'azubipassword',
        }

        response = self.client.post("http://127.0.0.1:8000/api/eventapp/users/register" , data, format='json')

        print(response.data)
        # Notice if status code - 201 created is returned.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # We want to ensure username, email, token
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertTrue('token' in response.data)
        self.assertEqual(response.data['is_success'], True)
        
        # No password is returned after creation completed
        self.assertFalse('password' in response.data)

class EventTest(APITestCase):
    
    def setUp(self):
        event = Event(title="Title 1", time="Morning", location="Kumasi", speaker="Dr. Judith", tagline="Tag 1")
        event.save()
        self.event = event
    
    def test_event_create(self):
        """
        Ensure we can create a new event
        """
        data = {
            'title': 'joe',
            'time': 'Morning',
            'location': 'Accra, Theatre',
            'speaker': 'Senior Software Engineer Chelsy',
            'tagline': 'Tag1',
        }
        
        response = self.client.post("http://127.0.0.1:8000/api/eventapp/events/events/" , data, format='json')

        print(response.data)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # We want to ensure 
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['time'], data['time'])
        self.assertEqual(response.data['speaker'], data['speaker'])
    
    def test_event_retrive(self):
        """
        Ensure we can retrive for event with its id
        """
        event = Event.objects.get(id=self.event.id)
        response = self.client.get(f"http://127.0.0.1:8000/api/eventapp/events/events/{self.event.id}/")

        print(response.data)
        # # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # We want to ensure 
        self.assertEqual(response.data['title'], event.title)
    
    def test_event_delete(self):
        """
        Ensure we can delete event with its id and 
        """
        response = self.client.delete(f"http://127.0.0.1:8000/api/eventapp/events/events/{self.event.id}/")

        print(response.data)
        # Notice if HTTP 204 status code is returned.
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_event_update(self):
        """
        Ensure we can create a new event
        """
        event = Event.objects.get(id=1)
        
        data = {
            'title': event.title,
            'time': 'Afternoon',
            'location': 'Accra, Theatre',
            'speaker': 'Senior Software Engineer Chelsy Superwoman',
            'tagline': 'Tag1',
        }
        
        response = self.client.put(f"http://127.0.0.1:8000/api/eventapp/events/events/{event.id}/" , data, format='json')

        print(response.data)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # We want to ensure 
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['time'], data['time'])
        self.assertEqual(response.data['speaker'], data['speaker'])