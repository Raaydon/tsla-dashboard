const axios = require("axios");
const baseUrl = "https://owner-api.teslamotors.com";

class Commands {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	post(url, parameters) {
		if (parameters) {
			payload = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				parameters: parameters,
			};
		} else {
			payload = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
		}
		axios
			.post(url, payload)
			.then((response) => {
				return response.data;
			})
			.catch((e) => {
				console.log(e);
			});
	}

	wake(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/wake_up`;
		return post(url);
	}

	openGarageDoor(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/trigger_homelink`;
		paramaters = {
			lat: process.env.LATITUDE,
			lon: process.env.LONGITUDE,
		};
		post(url, parameters);
	}

	unlockDoors(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/door_unlock`;
		return post(url);
	}

	lockDoors(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/door_lock`;
		return post(url);
	}

	openFrontTrunk(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/actuate_trunk`;
		parameters = {
			which_trunk: "front",
		};
		return post(url, parameters);
	}

	openRearTrunk(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/actuate_trunk`;
		parameters = {
			which_trunk: "rear",
		};
		return post(url, parameters);
	}

	openWindows(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		parameters = {
			command: "vent",
			lat: process.env.LATITUDE,
			lon: process.env.LONGITUDE,
		};
		return post(url, parameters);
	}

	closeWindows(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		parameters = {
			command: "close",
			lat: 0, // tesla api uses lat, lon 0 for closing windows
			lon: 0,
		};
		return post(url, parameters);
	}

	startCharging(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/charge_start`;
		return post(url);
	}

	startClimateControl(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/auto_conditioning_start`;
		return post(url);
	}

	stopClimateControl(id) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/auto_conditioning_stop`;
		return post(url);
	}
	setTemp(id, temp) {
		url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		parameters = {
			driver_temp: temp,
			passenger_temp: temp,
		};
		return post(url, parameters);
	}
}

module.exports = { Commands };
