import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DataCard from "./DataCard";
import { Clock } from "./Clock/Clock";
import { MainContext } from "../App";

export default function Dashboard() {
	const { vehicleData, get_vehicle_data } = useContext(MainContext);

	useEffect(() => {
		get_vehicle_data();
	}, []);

	const data = {
		battery_level: vehicleData?.charge_state?.battery_level,
		battery_range: vehicleData?.charge_state?.battery_range,
		charging_state: vehicleData?.charge_state?.charging_state,
		charge_limit_soc: vehicleData?.charge_state?.charge_limit_soc,
		inside_temp: vehicleData?.climate_state?.inside_temp,
		outside_temp: vehicleData?.climate_state?.outside_temp,
		charge_rate: vehicleData?.charge_state?.charge_rate,
		minutes_to_full_charge:
			vehicleData?.charge_state?.minutes_to_full_charge,
		latitude: vehicleData?.drive_state?.latitude,
		longitude: vehicleData?.drive_state?.longitude,
		df: vehicleData?.vehicle_state?.df,
		dr: vehicleData?.vehicle_state?.dr,
		ft: vehicleData?.vehicle_state?.ft,
		pf: vehicleData?.vehicle_state?.pf,
		pr: vehicleData?.vehicle_state?.pr,
		rt: vehicleData?.vehicle_state?.rt,
		odometer: vehicleData?.vehicle_state?.odometer,
	};

	function getData(key) {
		if (data[key]) {
			return data[key];
		} else {
			return "loading...";
		}
	}
	// weather
	!(function (d, s, id) {
		var js,
			fjs = d.getElementsByTagName(s)[0];
		if (!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = "https://weatherwidget.io/js/widget.min.js";
			fjs.parentNode.insertBefore(js, fjs);
		}
	})(document, "script", "weatherwidget-io-js");
	return (
		<>
			<div className="Dashboard">
				<div className="metrics_grid">
					<Clock />

					<DataCard
						label={"🔋Battery Level"}
						metric={
							getData("battery_level") +
							"% (" +
							getData("battery_range") +
							" miles)"
						}
					/>
					<DataCard
						label={"🔌Charging State"}
						metric={getData("charging_state")}
					/>
					<DataCard
						label={"⚡Charge Limit"}
						metric={getData("charge_limit_soc") + "%"}
					/>
					{getData("charge_rate") !== "loading..." && (
						<>
							<DataCard
								label={"⚡Charge Rate"}
								metric={getData("charge_rate") + "W"}
							/>
							<DataCard
								label={"⏱Time to Full Charge"}
								metric={
									getData("minutes_to_full_charge") + "hours"
								}
							/>
						</>
					)}
					<DataCard
						label={"🌡Temperature"}
						metric={
							"Inside: " +
							getData("inside_temp") +
							"° | Outside: " +
							getData("outside_temp") +
							"°"
						}
					/>
					<DataCard label={"Total Miles"} metric={getData("odometer") + ' miles'} />
					<div className="weather">
						<a
							className="weatherwidget-io"
							href="https://forecast7.com/en/52d210d12/cambridge/"
							data-label_1="CAMBRIDGE"
							data-label_2="WEATHER"
							data-font="Roboto"
							data-icons="Climacons Animated"
							data-days="5"
							data-theme="dark"
						>
							CAMBRIDGE WEATHER
						</a>
					</div>
				</div>
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
