from django.core.mail import EmailMessage
from eventapp.models import EventBooking, User
import datetime


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.content_subtype = "text/html"
        email.send()
    
    @staticmethod
    def validate_username(username):
        user = None
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return None
        if user != None:
            return username

    @staticmethod
    def checkEmail(email):
        user = None
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        if user != None:
            return email

    @staticmethod
    def generate():
        import random
        alpnum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
        ls = list(alpnum)
        random.shuffle(ls)
        return "".join(ls[0:5])
    
    @staticmethod
    def checkExpireDayd(exp_date):
        d2 = datetime.now()
        d1 = datetime.date(d1)
        return abs((d2 - d1).days)
    
    @staticmethod
    def checkIfUserHasBook(books, uid):
        listIds = []
        if books is None:
            return False
        else:
            for book in books:
                listIds.append(book.user_id)
            if uid in listIds:
                return True
            else:
                return False
    
    @staticmethod
    def checkIfUserHasSameBook(books, uid):
        listIds = []
        if books is None:
            return False
        else:
            for book in books:
                listIds.append(book.user_id)
            if uid in listIds:
                return True
            else:
                return False
    
    @staticmethod 
    def lengthEventBooking(eid):
        books = EventBooking.objects.filter(event_id__exact=eid)
        count = 0
        if books is None:
            return 0
        for book in books:
            count += 1
        return count