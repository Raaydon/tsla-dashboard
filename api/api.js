const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const tsla = require("./tsla");

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

const app = express();
const port = 7777;
const baseUrl = "https://owner-api.teslamotors.com";

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
	if (!accessToken) {
		res.sendStatus(403);
	} else {
		axios
			.post(`${baseUrl}/api/1/vehicles`, {
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

	if (!accessToken || !id) res.sendStatus(403);
	axios
		.post(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((response) => {
			res.send(JSON.stringify(response?.data?.response));
		});
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
