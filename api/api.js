const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const tsla = require("./tsla");
const { access } = require("fs");

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

const app = express();
const port = 5000;
const baseUrl = "https://owner-api.teslamotors.com";

var awake = false

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", `*`);
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
	);
	next();
});

app.get("/vehicles", async (req, res) => {
	const accessToken = req.headers.authorization.replace(/^Bearer /, "");
	if ((!accessToken || accessToken === null || accessToken === "null") && awake === true) {
		res.sendStatus(403);
	} else {
		axios
			.get(`${baseUrl}/api/1/vehicles`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				const id = response?.data?.response[0]?.id;
				res.send(JSON.stringify(id));
			});
	}
});

app.get("/vehicle/:id/state/", async (req, res) => {
	const accessToken = req.headers.authorization.replace(/^Bearer /, ""),
		id = req.params.id,
		url = `${baseUrl}/api/1/vehicles/${id}`;

	if (!accessToken || !id || id === null || id === 'null' || accessToken === null) {
		res.sendStatus(403);
	} else {
        console.log('card id: ',id)
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				res.send(JSON.stringify(response?.data?.response));
			});
	}
});

app.get("/vehicle/:id/data/", async (req, res) => {
	const accessToken = req.headers.authorization.replace(/^Bearer /, ""),
		id = req.params.id,
		url = `${baseUrl}/api/1/vehicles/${id}/vehicle_data`;

	if (!accessToken || !id || id === null || id === 'null' || accessToken === null) {
		res.sendStatus(403);
	} else {
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				res.send(JSON.stringify(response?.data?.response));
			});
	}
});

app.get("/", async (req, res) => {
	var accessToken = process.env.REACT_APP_TOKEN;
	if (accessToken === undefined) {
		accessToken = await tsla.teslaLogin(email, password);
	}
	console.log("access token: ", accessToken);
	return res.send(JSON.stringify(accessToken));
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
