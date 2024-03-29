# Air Quality Zipcode Lookup

## About the Developer

Molly is a software engineer at Target. She enjoys problem solving, learning, and working on collaborative teams. She was a mathematics major in college, enjoyed her early programming experience with R and Mathematica, and wants to use math in practical ways and serve her community. This is her private non-work related repo.

## Project Description

Air Quality Zipcode Lookup is a web app that shows current Air Quality Index (AQI). The user enters a zip code and sees air quality data for that day and every day for the previous week. The web page displays a chart showing the air quality index for PM2.5 and ozone AQI. The website includes Flask routes for creating a search from the user's zipcode lookup and saving it to the database, and finding all searches for a user. The additional features include a chart showing data from all searches for a given zipcode. The user can also input days and the app looks up the AQI info for that day and adds it to the chart. This website is helpful for people planning trips, or for researching air quality where they live or are planning to move.

## Tech Stack

SQL Alchemy, Python, Flask, JavaScript, Chart.js, Jinja, HTML, CSS.
Uses the AirNow API.

## Requirements

- Install requirements.txt
- Create airsearch sql database
- For testing create testdb

## Project Video

https://youtu.be/thagA6CSYN8

## Uses

The EPA's Airnow.gov website implemented a historical air quality chart by location very similar to mine, soon after I began publishing my project. It shows daily, weekly, and monthly trends, and uses the same color coded bar charts as I made in this project. An example can be seen at: https://www.airnow.gov/?city=Saint%20Paul&state=MN&country=USA if you click Recent Trends.
