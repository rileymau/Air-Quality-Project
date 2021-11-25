"""Project Server Test File"""

import server, crud
import unittest, doctest

from unittest import TestCase
from server import app
from model import connect_to_db, db, example_data
from flask import session


def load_tests(loader, tests, ignore):
    """run the tests in other places.
    There is a doctest in server.py"""
    tests.addTests(doctest.DocTestSuite(server))
    return tests


class aqiAppTests(TestCase):
    """Flask tests."""

    def setUp(self):
        """Before every test."""

        # Get the Flask test client
        self.client = app.test_client()

        # Show Flask errors that happen during tests
        app.config['TESTING'] = True

    def test_homepage(self):
        """check that the homepage title is in the result of '/' route."""

        result = self.client.get("/")
        self.assertIn(b'<h1 id="doctest">Welcome to Air Quality Project Page</h1>', result.data)


class FlaskTestsDatabase(TestCase):
    """Flask tests that use the database."""

    def setUp(self):
        """Before every test."""

        # Get the Flask test client
        self.client = app.test_client()
        app.config['TESTING'] = True

        # Connect to test database
        connect_to_db(app, "postgresql:///testdb")

        # Create tables and add sample data
        db.create_all()
        example_data()

    def tearDown(self):
        """Do at end of every test."""

        db.session.remove()
        db.drop_all()
        db.engine.dispose()

    def test_login(self):
        """Test login page."""

        result = self.client.post("/login",
                                  data={"email": "1@mail.com", "password": "123"},
                                  follow_redirects=True)
        self.assertIn(b"<h1>Welcome Back", result.data)

    # def test_searches(self):
    #     """Test departments page."""

    #     result = self.client.get("/departments")
    #     self.assertIn(b"Legal", result.data)

    # def test_departments_details(self):
    #     """Test departments page."""

        # result = self.client.get("/department/fin")
        # self.assertIn(b"Phone: 555-1000", result.data)


class FlaskTestsLoggedIn(TestCase):
    """Flask tests with user logged in to session."""

    def setUp(self):
        """Stuff to do before every test."""

        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'
        self.client = app.test_client()

        with self.client as c:
            with c.session_transaction() as sess:
                sess['user_id'] = 1

    def test_important_page(self):
        """Test important page."""

        result = self.client.get('/<user_id>')
        self.assertIn(b"<h1>Welcome Back", result.data)



## note for saving database before testing
## $ pg_dump airsearch > database.sql

if __name__ == "__main__":
    import unittest
    unittest.main()
    #if running test.server file, run unittest.
