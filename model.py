"""Project Data Model"""

from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

#db name is airsearch

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(25), nullable=False)
    
    #searches = list of serches objects from that user (backref)

    def __repr__(self):
        return f'<User: user_id={self.user_id} email={self.email}>'


class Search(db.Model):
    """A search."""

    __tablename__ = "searches"

    search_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    date = db.Column(db.Date)
    zipcode = db.Column(db.Integer)
    reporting_area = db.Column(db.String(50))
    ozone = db.Column(db.Integer)
    pm = db.Column(db.Integer)
    category = db.Column(db.Integer)
    distance = 10

    #pm2.5 is called pm for simplicity

    user = db.relationship("User", backref="searches")

    def __repr__(self):
        return f"<Search: search_id={self.search_id} user={self.user_id} date={self.date} zipcode={self.zipcode} reporting_area={self.reporting_area} ozone={self.ozone} pm2.5={self.pm} category={self.category}>"


def example_data():
    """Create sample data."""

    # In case this is run more than once, empty out existing data
    User.query.delete()
    Search.query.delete()

    # Add sample users and searches
    u1 = User(email="1@mail.com", password="123")
    u2 = User(email="2@mail.com", password="123")
    u3 = User(email="3@mail.com", password="123")

    s1 = Search(user=u1, date='2021-11-14', zipcode=12345, reporting_area="Area1", ozone=None, pm=40, category=1)
    s2 = Search(user=u2, date='2021-11-15', zipcode=13579, reporting_area="Area2", ozone=None, pm=70, category=2)
    s3 = Search(user=u3, date='2021-11-16', zipcode=90000, reporting_area="Area3", ozone=30, pm=None, category=1)

    # users = [u1, u2, u3]
    # searches = [s1, s2, s3]
    db.session.add_all([s1, s2, s3, u1, u2, u3])
    db.session.commit()


def connect_to_db(flask_app, db_uri="postgresql:///airsearch", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    #flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    #can turn off echo later if too much output

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to db :)")
    pass

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
