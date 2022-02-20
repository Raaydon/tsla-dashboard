import React, { useEffect, useState } from "react";
import axios from "axios";
import DataCard from "../DataCard";

const items = [
	"access_token",
	"token_type",
	"expires_in",
	"refresh_token",
	"created_at",
	"id",
];

const dataObj = {};
const dataUrl = "http://localhost:7777";

items.forEach((item) => {
	var x = sessionStorage.getItem(item);
	if (x === "undefined") {
		dataObj[item] = undefined;
	} else {
		dataObj[item] = x;
	}
});

export default function Dashboard() {
	const [storedData, setStoredData] = useState(dataObj);
	const [vehicleState, setVehicleState] = useState({});
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState("");
	useEffect(() => {
		console.log("stored data: ", storedData);
		if (!storedData.access_token || storedData.access_token === undefined) {
			setStatus("loading");
			authenticateUser();
		}
		if (!storedData.id) {
			setStatus("loading");
			storeVehicleId(storedData.access_token);
		}
		retrieveVehicleState(storedData.access_token);
		setStatus("");
	}, [storedData]);

	function authenticateUser() {
		axios
			.get(dataUrl)
			.then((response) => {
				const tempStoredData = storedData;
				tempStoredData.access_token = response.data;
				setStoredData(tempStoredData); // set stored data to token
				items.forEach(
					(item) =>
						item !== "id" &&
						sessionStorage.setItem(item, response.data[item])
				);
			})
			.catch((e) => console.log(e));
	}

	function storeVehicleId(accessToken) {
		axios
			.get(`${dataUrl}/vehicles/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				console.log(response)
				sessionStorage.setItem("id", response.data);
				const storedDataClone = { ...storedData };
				storedDataClone.id = response.data;
				setStoredData(storedDataClone);
				retrieveVehicleState(accessToken);
			})
			.catch((e) => console.log(e));
	}

	function retrieveVehicleState(accessToken) {
		axios
			.get(`${dataUrl}/vehicle/${storedData.id}/state/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => {
				setVehicleState(res.data);
				setLoading(false);
			})
			.catch((e) => console.log(e));
	};

	const data = {
		battery_level: vehicleState?.charge_state?.battery_level,
		battery_range: vehicleState?.charge_state?.battery_range,
		charging_state: vehicleState?.charge_state?.charging_state,
		charge_limit_soc: vehicleState?.charge_state?.charge_limit_soc,
		inside_temp: vehicleState?.climate_state?.inside_temp,
		is_climate_on: vehicleState?.climate_state?.is_climate_on,
		outside_temp: vehicleState?.climate_state?.outside_temp,
		fan_status: vehicleState?.climate_state?.fan_status,
	};

	const metrics = [
		[
			"battery_level",
			"battery_range",
			"charging_state",
			"charge_limit_soc",
		],
		["inside_temp", "is_climate_on", "outside_temp", "fan_status"],
	];

	return (
		<>
			{status === "loading" && <>Fetching data...</>}
			{metrics.map((stats, index) => (
				<div className="metrics" key={index}>
					{stats.map((metric) => (
						<DataCard
							key={metric}
							label={metric}
							metric={data[metric]}
						/>
					))}
				</div>
			))}
		</>
	);
}
