import "./styles/main.scss";
import React, {useEffect} from "react";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
	useEffect(() => {
		setInterval(() => {
			axios
				.get("http://192.168.1.32/tesla/php/check_for_reload.php")
				.then((data) => {
					if (data.reload) {
						window.location.reload();
						console.log('reloaded')
					}
				});
		}, 25000);
	});

	return (
		<div className="App">
			<Dashboard />
		</div>
	);
}

export default App;
