# https://github.com/tdorssers/TeslaPy

import os
import teslapy
from flask import Flask, json
from flask_cors import CORS, cross_origin

email = os.getenv("REACT_APP_EMAIL")

app = Flask(__name__, static_folder='../build', static_url_path='/')
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# @app.route("/", methods=["GET"])
# def main():
#     return "x"


@app.route("/vehicle_data", methods=["GET"])
@cross_origin()
def getData():
    with teslapy.Tesla(email) as tesla:
        vehicles = tesla.vehicle_list()
        vehicles[0].sync_wake_up()

        # vehicles[0].command('ACTUATE_TRUNK', which_trunk='front')
        # print(vehicles[0].get_vehicle_data()['vehicle_state']['car_version'])

        # print(vehicles[0].get_vehicle_data())
        return vehicles[0].get_vehicle_data()


app.run()