"""
IMPORT DEPENDENCIES
"""


from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

"""
FLASK INSTANCE
"""


app = Flask(__name__)

"""
DB DETAILS
"""


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'garminAthlete'
COLLECTION_NAME = 'activities'

"""
A Flask view to serve the main dashboard page.
"""


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


"""
A Flask view to serve the project data from
MongoDB in JSON format.
"""


@app.route('/garminAthlete/activities')
def athlete_activities():

    """
    A constant that defines the record fields that we wish to retrieve.
    """
    f_i_e_l_d_s = {'_id': False, 'activity_type': True, 'date_posted': True,
                   'year': True, 'equipmend_used': True, 'indoor_outdoor': True,
                   'distance': True, 'calories': True, 'time': True,
                   'avg_hr': True, 'avg_pace': True, 'elev_gain': True,
                   'elev_loss': True
                   }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 667
        projects = collection.find(projection=f_i_e_l_d_s, limit=667)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == "__main__":
    app.run(debug=True)
