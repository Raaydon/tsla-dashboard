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
const serverUrl = "http://localhost:5000";

items.forEach((item) => {
	var x = localStorage.getItem(item);
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
	const [status, setStatus] = useState("loading");
	const [vehicleData, setVehicleData] = useState({});
	const [id_list, setId_list] = useState([]);

	useEffect(() => {
		if (
			!storedData.access_token ||
			storedData.access_token === undefined ||
			storedData.access_token === null
		) {
			setStatus("loading");
			authenticateUser();
		}
		if (!storedData.id) {
			setStatus("loading");
			storeVehicleId(storedData.access_token);
		}
		retrieveVehicleState(storedData.access_token);
		retrieveVehicleData(storedData.access_token);
		setStatus("");
		console.log(storedData);
	}, [storedData]);

	function authenticateUser() {
		axios.get(`${serverUrl}/auth`).catch((e) => console.log(e));
	}

	function storeVehicleId(accessToken) {
		axios
			.get(`${serverUrl}/vehicles`) // retrieves a list of all vehicles' IDs
			.then((response) => {
				console.log(response);
				sessionStorage.setItem("id", response.data[0]);
				sessionStorage.setItem("id_list", response.data);
				const storedDataClone = { ...storedData };
				storedDataClone.id = response.data;
				setStoredData(storedDataClone);
				retrieveVehicleState(accessToken);
				retrieveVehicleData(accessToken);
			})
			.catch((e) => console.log(e));
	}

	function setVehicle(num) {
		sessionStorage.setItem("id", num);
	}

	function retrieveVehicleState(accessToken) {
		axios
			.get(`${serverUrl}/vehicle/${storedData.id}/state/`, {
				parameters: {
					id: storedData.id,
				},
			})
			.then((res) => {
				setVehicleState(res.data);
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}

	function retrieveVehicleData(accessToken) {
		axios
			.get(`${serverUrl}/vehicle/${storedData.id}/data/`, {
				parameters: {
					id: storedData.id,
				},
			})
			.then((res) => {
				console.log(res);
				setVehicleData(res.data);
			})
			.catch((e) => console.log(e));
	}

	const data = {
		battery_level: vehicleData?.charge_state?.battery_level,
		battery_range: vehicleData?.charge_state?.battery_range,
		charging_state: vehicleData?.charge_state?.charging_state,
		charge_limit_soc: vehicleData?.charge_state?.charge_limit_soc,
		inside_temp: vehicleData?.climate_state?.inside_temp,
		is_climate_on: vehicleData?.climate_state?.is_climate_on,
		outside_temp: vehicleData?.climate_state?.outside_temp,
		fan_status: vehicleData?.climate_state?.fan_status,
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
		<div className="Dashboard">
			{loading && <p className="loadingTxt">Fetching data...</p>}
			{!loading &&
				metrics.map((stats, index) => (
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
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d39164.91271133!2d0.1534199558369157!3d52.15601871837557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x47d87b58d3f92cd7%3A0x5fb53e2a018eca0d!2sLondon%20Rd%2C%20Pampisford%2C%20Cambridge%20CB22%203EF!3m2!1d52.1113369!2d0.17324799999999999!4m5!1s0x47d8709a55555555%3A0xbf6848477990a51e!2sCambridge%20University%20Press%20%26%20Assessment%2C%20Shaftesbury%20Road%2C%20Cambridge!3m2!1d52.1881464!2d0.13140549999999998!5e0!3m2!1sen!2suk!4v1645455547547!5m2!1sen!2suk"
				className="googleMap"
				title="googleMap"
				allowFullScreen=""
				loading="lazy"
			></iframe>
		</div>
	);
}
