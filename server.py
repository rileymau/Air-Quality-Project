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

@app.route('/users')
def all_users():
    """view all users list"""
    users = crud.get_users()
    return render_template("allusers.html", users=users)

@app.route("/users/<user_id>")
def show_user(user_id):
    """ Show user's profile page. """
    user = crud.get_user_by_id(user_id)
    return render_template("user.profile.html", user=user)

@app.route("/users", methods=["POST"])
def register_user():
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if user:
        flash("You are already registred, please try another email")

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
        flash("Logged In!")
        return render_template('user.profile.html', user=user)
        #same problem as line 71

@app.route('/<user_id>')
def show_profile(user_id):
    """show a user's profile with their searches"""
    user = crud.get_user_by_id(user_id)
    my_searches = crud.get_searches_for_user(user)
    return render_template('user.profile.html', user=user, my_searches=my_searches)
    ##what if no searches yet? 

    # @app.route("/tbd")
# def show_user_searches(user_id):
#     user = crud.get_user_by_id(user_id)
# #####

@app.route('/login.page')
def go_to_login():
    return render_template('login.page.html')

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


if __name__ == "__main__":
    #DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
