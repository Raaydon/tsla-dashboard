const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const tsla = require("./tsla");
const Commands = require("./commands");
var commands = new Commands(process.env.ACCESS_TOKEN);

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
var accessToken = process.env.REACT_APP_TOKEN;

const app = express();
const port = 5000;
const baseUrl = "https://owner-api.teslamotors.com";

var awake = false;
function checkAwake(id) {
	// let url = `${baseUrl}/api/1/vehicles`;
	// while (awake === false) {
	// 	console.log(commands);
	// 	axios
	// 		.get(url, {
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			commands.wake(id).then(() => {
	// 				awake = true;
	// 			});
	// 		})
	// 		.then((response) => {
	// 			awake = true;
	// 		});
	// }
	console.log(commands);
	commands.wake(id).then(() => {
		awake = true;
	});
}

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", `*`);
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
	);
	next();
});

app.get("/vehicles", async (req, res) => {
	const accessToken = req.headers.authorization;
	var id;
	if (!accessToken || accessToken === null || accessToken === "null") {
		res.sendStatus(403);
	} else if (awake === true) {
		axios
			.get(`${baseUrl}/api/1/vehicles`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				id = response?.data?.response[0]?.id;
				res.send(JSON.stringify(id));
			})
			.catch((err) => {
				console.log(err);
				checkAwake(id);
			});
	}
});

app.get("/vehicle/:id/state/", async (req, res) => {
	const accessToken = req.headers.authorization,
		id = req.params.id,
		url = `${baseUrl}/api/1/vehicles/${id}`;

	if (
		!accessToken ||
		!id ||
		id === null ||
		id === "null" ||
		accessToken === null
	) {
		res.sendStatus(403);
	} else if (awake === true) {
		console.log("card id: ", id);
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				res.send(JSON.stringify(response?.data?.response));
			})
			.catch((err) => {
				console.log(err);
				checkAwake(id);
			});
	}
});

app.get("/vehicle/:id/data/", async (req, res) => {
	const accessToken = req.headers.authorization,
		id = req.params.id,
		url = `${baseUrl}/api/1/vehicles/${id}/vehicle_data`;

	if (
		!accessToken ||
		!id ||
		id === null ||
		id === "null" ||
		accessToken === null
	) {
		res.sendStatus(403);
	} else if (awake === true) {
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				res.send(JSON.stringify(response?.data?.response));
			})
			.catch((err) => {
				console.log(err);
				checkAwake(id);
			});
	}
});

app.get("/", async (req, res) => {
	if (accessToken === undefined) {
		if (email !== undefined || password !== undefined) {
			accessToken = await tsla.teslaLogin(email, password);
		} else {
			console.log("No email or password found in .env file");
		}
	}
	commands = new Commands(accessToken);
	checkAwake();
	return res.send(JSON.stringify(accessToken));
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
