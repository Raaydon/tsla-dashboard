import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import Dashboard from './components/Dashboard/Dashboard';

function App() {
	return (
		<div className="App">
			<Nav />
			<Dashboard />
		</div>
	)
}

export default App;
