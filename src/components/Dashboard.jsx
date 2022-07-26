import React, { useEffect, useState } from "react";
import axios from "axios";
import DataCard from "./DataCard";
import { Clock } from "./Clock/Clock";

const serverUrl = "http://localhost:5000";

export default function Dashboard() {
	const [vehicleData, setVehicleData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		get_vehicle_data();
		setLoading("");
	}, []);

	function get_vehicle_data() {
		axios
			.get(`${serverUrl}/vehicle_data`)
			.then((res) => {
				console.log(res);
				setVehicleData(res.data);
				setLoading(false);
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
		<>
			<Clock />
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
		</>
	);
}
