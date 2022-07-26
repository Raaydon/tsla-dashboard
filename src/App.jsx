import "./styles/main.scss";
import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
	setTimeout(() => {
		fetch("http://192.168.1.32/tesla/php/check_for_reload.php")
			.then((response) => response.json())
			.then((data) => {
				if (data.reload) {
					window.location.reload();
				}
			});
	}, 30000);

	return (
		<div className="App">
			<Dashboard />
		</div>
	);
}

export default App;
