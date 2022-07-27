import "./styles/main.scss";
import React, { useEffect, createContext, useState } from "react";
import Dashboard from "./components/Dashboard";
import axios from "axios";

export const MainContext = createContext();

function App() {
	const serverUrl = "http://localhost:5000";

	const [vehicleData, setVehicleData] = useState({});
	function get_vehicle_data() {
		axios
			.get(`${serverUrl}/vehicle_data`)
			.then((res) => {
				console.log(res);
				setVehicleData(res.data);
			})
			.catch((e) => console.log(e));
	}

	useEffect(() => {
		setInterval(() => {
			axios
				.get("http://192.168.1.32/tesla/php/check_for_reload.php")
				.then((data) => {
					if (data.reload) {
						window.location.reload();
					}
				});
		}, 20000);
	});

	return (
		<MainContext.Provider
			value={{ vehicleData, get_vehicle_data, setVehicleData }}
		>
			<div className="App">
				<Dashboard />
			</div>
		</MainContext.Provider>
	);
}

export default App;
