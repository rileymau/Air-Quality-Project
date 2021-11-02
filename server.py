"""Project Server"""

from flask import (Flask, render_template, request, flash, session,
    redirect)

from model import connect_to_db
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined 

@app.route('/')
def homepage():
    """View homepage."""
    return render_template('homepage.html')

@app.route("/users", methods=["POST"])
def register_user():
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if user:
        flash("you are already registred, try another email")

    else:
        crud.create_user(email, password)
        flash("Account has been created, please login")

    return redirect("/")
#change to login page once set up

@app.route("/login", methods = ["POST"])
def login_page(): 

    email = request.form.get("email")
    password = request.form.get("password")
    user = crud.get_user_by_email(email)

    if not user or user.password != password:
        flash("Incorrect password")
        return redirect("/")
    else:
        session["user_email"] = user.email
        flash("Welcome back!")
        return redirect("/")
        #change to user profile once set up

@app.route('/<user_id>')
def show_profile(user_id):
    """show a user's profile"""
    user = crud.get_user_by_id(user_id)
    return render_template('user.profile.html', user=user)
#this is not connected to/from anything yet


#To do:
#add forgot password buttons
#create separate login page
#create account links to login page
#user login links to user's profile page





if __name__ == "__main__":
    #DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
