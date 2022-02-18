import React from "react";
import tjs  from 'teslajs';

export default function Dashboard() {
	const token = process.env.REACT_APP_TOKEN;
	var options = { authToken: result.authToken };
    tjs.vehicle(options, function (err, vehicle) {
        console.log("Vehicle " + vehicle.vin + " is: " + vehicle.state);
    });
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
