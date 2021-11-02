"""Project Data Model"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    login = db.Column(db.String(25), nullable=False, unique=True)
    password = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    
    #searches = list of serches objects from that user (backref)

    def __repr__(self):
        return f'<User: user_id={self.user_id} login={self.login}>'


class Search(db.Model):
    """A search."""

    __tablename__ = "searches"

    search_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"))
    date = db.Column(db.DateTime)
    zipcode = db. Column(db.Integer)
    ozone = db. Column(db.Integer)
    pm = db. Column(db.Integer)
    category = db. Column(db.Integer)
    distance = 10

    #pm2.5 is called pm for simplicity
    #tbd save url or json

    user = db.relationship("User", backref="searches")

    def __repr__(self):
        return f"<Search: search_id={self.search_id} date={self.date} zipcode={self.zipcode} category={self.category}>"



def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    #can turn off echo later if too much output

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to db")

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
