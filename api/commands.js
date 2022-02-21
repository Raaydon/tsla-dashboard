const axios = require("axios");
const baseUrl = "https://owner-api.teslamotors.com";

class Commands {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	post(url, parameters) {
		var payload = {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		};
		if (parameters) {
			payload = {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
				parameters: parameters,
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

	const wake = (id) => {
		const url = `${baseUrl}/api/1/vehicles/${id}/wake_up`;
		return this.post(url);
	}

	openGarageDoor(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/trigger_homelink`;
		const parameters = {
			lat: process.env.LATITUDE,
			lon: process.env.LONGITUDE,
		};
		this.post(url, parameters);
	}

	unlockDoors(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/door_unlock`;
		return this.post(url);
	}

	lockDoors(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/door_lock`;
		return this.post(url);
	}

	openFrontTrunk(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/actuate_trunk`;
		const parameters = {
			which_trunk: "front",
		};
		return this.post(url, parameters);
	}

	openRearTrunk(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/actuate_trunk`;
		const parameters = {
			which_trunk: "rear",
		};
		return this.post(url, parameters);
	}

	openWindows(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		const parameters = {
			command: "vent",
			lat: process.env.LATITUDE,
			lon: process.env.LONGITUDE,
		};
		return this.post(url, parameters);
	}

	closeWindows(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		const parameters = {
			command: "close",
			lat: 0, // tesla api uses lat, lon 0 for closing windows
			lon: 0,
		};
		return this.post(url, parameters);
	}

	startCharging(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/charge_start`;
		return this.post(url);
	}

	startClimateControl(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/auto_conditioning_start`;
		return this.post(url);
	}

	stopClimateControl(id) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/auto_conditioning_stop`;
		return this.post(url);
	}
	setTemp(id, temp) {
		const url = `${baseUrl}/api/1/vehicles/${id}/command/window_control`;
		const parameters = {
			driver_temp: temp,
			passenger_temp: temp,
		};
		return this.post(url, parameters);
	}
}

module.exports = Commands;
