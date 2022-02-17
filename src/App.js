import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import Nav from "./components/Nav/Nav";
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
