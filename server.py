"""Project Server"""

from flask import (Flask, render_template, request, flash, session,
    redirect, jsonify)

from model import connect_to_db
import crud
import doctest

from jinja2 import StrictUndefined

from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """View homepage, with most recent search"""
    recent = crud.most_recent_search()
    
    #6 day loop for recent search.
    #set day7, and set delta1 as 1 day increments
    six_days_recent = []

    date_get = recent.date

    delta1 = timedelta(days=1)

    #add dates 1 to 6 to list
    for _ in range(6):
        date_get = date_get - delta1
        date = date_get
        six_days_recent.append(date.isoformat())

    six_days_recent.reverse()
    print(six_days_recent)
    return render_template('homepage.html', recent=recent, six_days_recent=six_days_recent)


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
    """Creating a new user account"""
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
    """Login process for returning user"""
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
    """Send user to login page"""
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

    #set day7, and set delta1 as 1 day increments
    six_days = []

    date_get = search.date

    delta1 = timedelta(days=1)

    #add dates 1 to 6 to list
    for _ in range(6):
        date_get = date_get - delta1
        date = date_get
        six_days.append(date.isoformat())

    #print(six_days)
    six_days.reverse()
    print(six_days)
    return render_template("search.details.html", search=search, six_days=six_days)


@app.route("/searches/extended/<search_id>")
def show_extendeed_search(search_id):
    """ Show an extended info zipcode search page. """
    search = crud.get_search_by_id(search_id)

    #copy six day code from @app.route("/searches/<search_id>")
    #set day7, and set delta1 as 1 day increments
    six_days = []

    date_get = search.date

    delta1 = timedelta(days=1)

    #add dates 1 to 6 to list
    for _ in range(6):
        date_get = date_get - delta1
        date = date_get
        six_days.append(date.isoformat())

    #print(six_days)
    six_days.reverse()
    print(six_days)
    return render_template("search.extended.html", search=search, six_days=six_days)


@app.route("/getnewsearch")
def show_new_search():
    """ Show the newest search page, with previous 6 days dates available."""
    search = crud.most_recent_search()
    #print("in search on py")

    #set day7, make into datetime object, and set delta1 as 1 day increments
    six_days = []
    #date_get = request.form.get("Date")

    date_get = search.date
    print(date_get)
    print(type(date_get))

    #a previous way before six days added to routes
    #make date from above, a datetime.
    #the date comes with a space at the end that needs to be removed. sliced date :10.
    #print(len(date_get))
    #print(date_get[:10])
    #date_get = datetime.strptime(date_get, "%Y-%m-%d")

    #print(date_get)
    #print(type(date_get))
    print('#################################################')

    delta1 = timedelta(days=1)

    #add dates 1 to 6 to list
    for _ in range(6):
        date_get = date_get - delta1
        date = date_get
        #was .date(), only need in original with date from js.
        six_days.append(date.isoformat())

    print(six_days)
    six_days.reverse()

    print(six_days)

    # json_six_days = jsonify(six_days)
    # print(json_six_days)

    #SAVE the six day list to search in database, jsonify?
    #search.six_days = six_days
    #return jsonify({six_days}) and search data, ozone, pm, if possible.
    return render_template("search.details.html", search=search, six_days=six_days)

def make_six_days(date):
    """A function to test logic in show_new_search() above.
    python3 -m doctest -v server.py
    For example:
    >>> make_six_days('2021-01-19')
    ['2021-01-13', '2021-01-14', '2021-01-15', '2021-01-16', '2021-01-17', '2021-01-18']
    """
    date_get = datetime.strptime(date, "%Y-%m-%d")
    six_days = []
    delta1 = timedelta(days=1)
    for _ in range(6):
        date_get = date_get - delta1
        date = date_get.date()  #.date() needed originally with date from js.
        six_days.append(date.isoformat())
    six_days.reverse()
    return(six_days)


## Graph Routes ##

@app.route("/savesearch", methods = ["POST"])
def save_user_search():
    """Create a search database object with user search"""
    print("**************************** got back to py")
    #define each piece needed for saving the search
    #adjust date format for python, to keep time stamp off
    user_id = request.form.get("user_num")
    user = crud.get_user_by_id(int(user_id))

    tdate = request.form.get("Date")
    zipcode = request.form.get("Zipcode")
    reporting_area = request.form.get("Reporting Area")
    ozone = request.form.get("Ozone AQI")
    pm = request.form.get("PM2.5 AQI")
    category = request.form.get("Category")

    #Create new user from data above, send user flash message
    #if request.method == "POST":
    search = crud.create_search(user, tdate, zipcode, reporting_area, ozone, pm, category)

    #re-run my searches, so user profile has update on next visit - needs to be in separate route/function to run now.
    #my_searches = crud.get_searches_for_user(user_id)

    print("search saved ******************************")
    
    return "search saved"
    #see show new search above for next steps, when "see new search details" button clicked on user profile page.  


@app.route("/allzipsearch.json") # methods = ["GET"])  #tried allzipsearch.json, allzipsearch.json/<zipcode>,
def searches_by_zipcode():  #tried (zipcode):
    zipcode = request.args.get("zipcode")
    print(zipcode)
    searches_by_zip = crud.get_searches_by_zipcode(zipcode)
    print("in zipcode route")
    #print(searches_by_zip)
    #print(crud.get_searches_by_zipcode(55112)) ... it works.

    date_tracker = []
    data_dict = []
    # ozone_values = []
    # pm_values = []
    # aqi_values = []


    for search in searches_by_zip:
        if search.date not in date_tracker:
            date_value = search.date
            if search.ozone == "None":
                aqi_value = search.pm
            else:
                aqi_value = search.ozone
            data_dict.append({'date': date_value, 'AQI': aqi_value})
            date_tracker.append(search.date)

    # sales_this_week.append({'date': date.isoformat(),
    #                             'melons_sold': total})

    # for search in searches_by_zip:
    #     if search.date not in date_values:
    #         date_values.append(search.date)
    #         if search.ozone == "None":
    #             aqi_values.append(search.pm)
    #         else:
    #             aqi_values.append(search.ozone)

            # ozone.values.append(search.ozone)
            # pm_values.append(search.pm)
        # else:
        #     continue
    # data = {"dates": [search.date for search in searches_by_zip],
    #     "ozone": [search.ozone for search in searches_by_zip],
    #     "pm": [search.pm for search in searches_by_zip]}
    # data = {"dates": date_values, "AQIs": aqi_values}
    # print(data)
    print(data_dict)

    return jsonify({'data': data_dict})
    #add to extended search page route tbd.
    #create list of dates, ozones, pm's, then jsonify and send to extended search.


    # return jsonify({'data': sales_this_week})


if __name__ == "__main__":
    #Connects to Flask, on localhost"""
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
    #DebugToolbarExtension(app), optional
