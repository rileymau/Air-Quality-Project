"""Project CRUD Operations"""

from model import db, User, Search, connect_to_db
from datetime import datetime


def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_search(user, date, zipcode, reporting_area, ozone, pm, category):
    """create and return a new search"""
    #date = datetime.strptime
    #date format edit to match json format
    #format = "%d-%b-%Y"
    #date=datetime.strptime(date_str, format)
    #props date.day, month, year, hour, minute)
    #strftime.org if need more formats

    search = Search(user=user, date=date, zipcode=zipcode, reporting_area=reporting_area, ozone=ozone, pm=pm, category=category)
    #nb user needs to be the user object, not list of one user object. 

    db.session.add(search)
    db.session.commit()

    return search


## User functions ##

def get_users():
    """returns all users"""
    return User.query.all()


def get_user_by_id(user_id):
    """returns one user"""
    return User.query.get(user_id)


def get_user_by_email(email):
    """get user from email to see if in database already"""
    #.first() brings up just object, not list of object.
    return User.query.filter(User.email == email).first()


## Search functions ##

def get_searches():
    """returns all searches"""
    return Search.query.all()


def get_search_by_id(search_id):
    """returns one search"""
    return Search.query.get(search_id)


def get_searches_for_user(user_id):
    """returns a list of search objects by user"""
    searches_by_user = Search.query.filter(Search.user_id==user_id).order_by(Search.search_id).all()
    return searches_by_user


# def get_new_search_for_user(my_searches):
#     """returns the newest search for that user """
#     ids_list = []
#     for search in my_searches:
#         ids_list.append(search_id)
#         newest = (max(ids_list))
#     return get_search_by_id(newest)


def most_recent_search():
    """returns most reecent search in the database"""
    all_searches = get_searches()
    return all_searches[-1]


def get_searches_by_zipcode(zipcode):
    """returns a list of search objects by zipcode"""
    searches_by_zipcode = Search.query.filter(Search.zipcode==zipcode).order_by(Search.date).all()
    return searches_by_zipcode
    #sort by first of each date...first()


#connects to Flask app, runs page on localhost
if __name__ == '__main__':
    from server import app
    connect_to_db(app)
