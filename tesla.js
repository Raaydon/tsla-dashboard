var tjs = require('teslajs');

const authToken = process.env.REACT_APP_TOKEN;

var options = { authToken: authToken };
tjs.vehicle(options, function (err, vehicle) {
    console.log("Vehicle " + vehicle.vin + " is: " + vehicle.state);
});