from flask import Flask, send_from_directory
import psycopg2
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load config from environment variables. Default to development values.
db_host = os.environ.get("DB_HOST", default="localhost")
db_database = os.environ.get("DB_HOST", default="postgres")
db_user = os.environ.get("DB_USER", default="postgres")
db_password = os.environ.get("DB_PASSWORD", default="bananananana")


def get_db_conn():
    """ Opens and returns a connection to the Postgres database. """
    return psycopg2.connect(
        host=db_host,
        database=db_database,
        user=db_user,
        password=db_password
    )


@app.route("/api/temperatures")
def get_temperatures():
    """ Handler for  GET /api/temperatures     
    Fetches temperatures from the Postgres database.
    
    Sample Response:
        {
            "Bedroom": [
                {
                    "temp": 80,
                    "timestamp": 1625392800
                },
                {
                    "temp": 77,
                    "timestamp": 1625407200
                }
            ],
            "Living Room": [
                {
                    "temp": 65,
                    "timestamp": 1625392800
                }
            ]
        }
    """
    response = {}

    with get_db_conn() as conn:
        with conn.cursor() as cursor:
            query = """
                SELECT location, timestamp, temp from temperatures 
                ORDER BY timestamp;
            """
            cursor.execute(query)

            for row in cursor:
                location = row[0]            

                if location not in response:
                    response[location] = []

                response[location].append({
                    "timestamp": row[1],
                    "temp": row[2],
                })

    return response


@app.route("/api/init_temperatures", methods=["POST"])
def init_temperatures():
    """ Handler for POST /api/init_temperatures
    Creates and populates the temperatures table in the database. """

    query = """
        CREATE TABLE IF NOT EXISTS temperatures (
            id        SERIAL    PRIMARY KEY,
            location  TEXT      NOT NULL,
            timestamp INT       NOT NULL,
            temp      INT       NOT NULL
        );

        INSERT INTO temperatures (location, timestamp, temp) 
        VALUES
            ('Living Room', 1625392800, 65),
            ('Living Room', 1625396400, 67),
            ('Living Room', 1625400000, 70),
            ('Living Room', 1625403600, 72),
            ('Living Room', 1625407200, 75),
            ('Bedroom', 1625392800, 80),
            ('Bedroom', 1625396400, 75),
            ('Bedroom', 1625400000, 70),
            ('Bedroom', 1625403600, 73),
            ('Bedroom', 1625407200, 77);
    """
    with get_db_conn() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query);

    return ("", 204)


@app.route("/app/")
@app.route("/app/dashboard")
def serve_index():
    return app.send_static_file("index.html")
    
@app.route("/app/<path:name>")
def serve_static(name):
    return send_from_directory("static", name)
