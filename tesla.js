var tjs = require('teslajs');

const authToken = process.env.REACT_APP_TOKEN;
const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

var options = { authToken: authToken };
tjs.vehicle(options, function (err, vehicle) {
    // console.log("Vehicle " + vehicle.vin + " is: " + vehicle.state);
    console.log(vehicle);
});