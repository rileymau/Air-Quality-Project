"""Project CRUD Operations"""

from model import db, User, Search, connect_to_db
from datetime import datetime



def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_search(user, date, zipcode, ozone, pm, category):

    #date = datetime.strptime
    #date format edit to match json format
    #format = "%d-%b-%Y"
    #date=datetime.strptime(date_str, format)
    #props date.day, month, year, hour, minute)
    #strftime.org if need more formats

    search = Search(user=user, date=date, zipcode=zipcode, ozone=ozone, pm=pm, category=category)
    #nb user needs to be the user object, not list of one user object. 

    db.session.add(search)
    db.session.commit()

    return search


#functions needed
#from today's date, get last 6 days too
#and run ajax for all those days








if __name__ == '__main__':
    from server import app
    connect_to_db(app)
