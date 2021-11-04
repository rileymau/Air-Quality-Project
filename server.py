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


## User and Login Routes ##

@app.route('/users')
def all_users():
    """view all users list"""
    users = crud.get_users()
    return render_template("allusers.html", users=users)
    #may be able to delete this route when all user page deleted. 


@app.route("/users/<user_id>")
def show_user(user_id):
    """ Show user's profile page. """
    user = crud.get_user_by_id(user_id)
    my_searches = crud.get_searches_for_user(user_id)
    return render_template("user.profile.html", user=user, my_searches=my_searches)
    #returns user object and list of searches by user to user profile
    #may be able to delete ths route when all user page deleted.


@app.route("/users", methods=["POST"])
def register_user():
    #Creating a user account
    # It gets the email and password the user put in, and regiters user in database
    email = request.form.get("email")
    password = request.form.get("password")

    #if email already in users database, flash message and redirect
    user = crud.get_user_by_email(email)
    if user:
        flash("You are already registred, please try another email or log in")

    else:
        #creeate user with the email and password user typed
        crud.create_user(email, password)
        flash("Account has been created, please login")

    #redirects to login/create account page   
    return redirect("/login.page")


@app.route("/login", methods = ["POST"])
def login_page(): 
    #Login process for user
    #email, password are from user input in form
    #user is pulled up by email
    email = request.form.get("email")
    password = request.form.get("password")
    user = crud.get_user_by_email(email)

    #if user doesn't exist in database or password is wrong: 
    #flash message and send to homepage
    if not user or user.password != password:
        flash("Incorrect password, or need to register")
        return redirect("/")
    else:
        #add user email to session, get searches by user to show on user profile, if any
        #send flash message, and log user in to their user profile
        session["user_email"] = user.email
        session["user"] = user
        my_searches = crud.get_searches_for_user(user.user_id)
        flash("Logged In!")
        return render_template('user.profile.html', user=user, my_searches=my_searches)


@app.route('/<user_id>')
def show_profile(user_id):
    """show a user's profile with their searches"""
    #loop searches on html page.  Section doesn't display if my_searches is empty.
    user = crud.get_user_by_id(user_id)
    my_searches = crud.get_searches_for_user(user_id)
    return render_template('user.profile.html', user=user, my_searches=my_searches)


@app.route('/login.page')
def go_to_login():
    #Send user to login page
    return render_template('login.page.html')


## Search Routes ##

@app.route('/searches')
def all_searches():
    """view all searches"""
    searches = crud.get_searches()
    return render_template("allsearches.html", searches=searches)


@app.route("/searches/<search_id>")
def show_search(search_id):
    """ Show a zipcode search page. """
    search = crud.get_search_by_id(search_id)
    return render_template("search.details.html", search=search)


@app.route("/searches/extended/<search_id>")
def show_extendeed_search(search_id):
    """ Show an extended info zipcode search page. """
    search = crud.get_search_by_id(search_id)
    return render_template("search.extended.html", search=search)


## API Routes ##


@app.route("/newsearch", methods = ["POST"])
def new_user_search():
    """Create a new API search with user input"""
    #get zipcode
    #get date
    #get 7 day option - later
    zipcode = request.form.get("zicode")
    date = request.form.get("date")
        #or datetime.now()
    user = session[user]

    #If API doesn't work, not enough info: 
    if not API: 
        flash("Sorry, that zipcode doesn't have enough air quality data for this search.  Enter another zipcode.")
        redirect("/user.profile/<user_id>")

    if API: 
        flash("Click on the new search below to see details")

        #ozone, pm, category come from API

        crud.create_search(user, date, zipcode, ozone, pm, category)


#Footer
if __name__ == "__main__":
    #DebugToolbarExtension(app)
    connect_to_db(app)
    #Connects to Flask, on localhost
    app.run(host="0.0.0.0", debug=True)
