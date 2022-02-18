var tjs = require('teslajs');

const authToken = process.env.REACT_APP_TOKEN;
const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

var options = { authToken: authToken };
tjs.vehicleAsync(options).done(function(vehicle) {
    console.log("Vehicle " + vehicle.vin + " is: " + vehicle.state);
});