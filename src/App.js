import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "react-hooks-use-modal";

import Nav from "./components/Nav/MainNav";
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
