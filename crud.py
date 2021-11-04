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

#User functions
def get_users():
    #returns all users
    return User.query.all()


def get_user_by_id(user_id):
    #returns one user
    return User.query.get(user_id)


def get_user_by_email(email):
    #get user from email to see if in database already
    #.first() brings up just object, not list of object.
    return User.query.filter(User.email == email).first()


#Search functions
def get_searches():
    #returns all searches
    return Search.query.all()


#def get_search_by_id(search_id):
    #returns search object by id
 #   return Search.query.filter(Search.search_id == search_id).first()


def get_search_by_id(search_id):
    return Search.query.get(search_id)
    #returns one search


def get_searches_for_user(user_id):
    searches_by_user = Search.query.filter(Search.user_id==user_id).all()
    return searches_by_user
    #returns a list of search objects by user


def most_recent_search():
#search get all, index -1
    return Search.query.last()
    #returns the most recent search in the database
    #Does this work?



if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    #connects to Flask app, runs page on localhost
