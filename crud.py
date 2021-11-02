"""Project CRUD Operations"""

from model import db, User, Search, connect_to_db



def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def create_search(user, date, zipcode, ozone, pm, category, distance=10):

    search = Search(useer=user, date=date, zipcode=zipcode, ozone=ozone, pm=pm, category=category, distance=distance)
    
    db.session.add(search)
    db.session.commit()

    return search


#functions needed
#set date time calc now for today's search 








if __name__ == '__main__':
    from server import app
    connect_to_db(app)
