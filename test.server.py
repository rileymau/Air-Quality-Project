"""Project Server Test File"""

import server, crud
import unittest, doctest

from unittest import TestCase
from server import app
from model import connect_to_db, db, example_data
from flask import session


def load_tests(loader, tests, ignore):
    """run the tests in other places.
    There is a doctest in server.py.  Working."""
    tests.addTests(doctest.DocTestSuite(server))
    return tests


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

    def test_homepage(self):
        """check that the homepage title is in the result of '/' route. Working."""

        result = self.client.get("/")
        self.assertIn(b'<h1 id="doctest">Welcome to Air Quality Project Page</h1>', result.data)

    def test_login(self):
        """Test login page. Working."""

        result = self.client.post("/login",
                                  data={"email": "1@mail.com", "password": "123"},
                                  follow_redirects=True)
        self.assertIn(b"<h1>Welcome Back", result.data)

    def test_search_details_page(self):
        """Test that a search page is showing a graph canvas. Working."""

        result = self.client.get("/searches/3")
                                #   data={"search_id": 3},
                                #   follow_redirects=True)
        self.assertIn(b"<canvas id=", result.data)


    # def test_create_searche(self):
    #     """Test departments page."""

    #     result = self.client.get("/departments")
    #     self.assertIn(b"Legal", result.data)


## note for saving database before testing
## $ pg_dump airsearch > database.sql

## before testing, create testing db
## $ createdb testdb

if __name__ == "__main__":
    import unittest
    unittest.main()
    #if running test.server file, run unittest.
