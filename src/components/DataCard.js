import React from "react";
import Card from "./Card";

const DataCard = (props) => {
	const renderMetric = (metric) => {
		if (typeof metric === "number" || typeof metric == "string") {
			return <span>{metric}</span>;
		} else if (typeof metric === "boolean") {
			return metric ? <span>Yes</span> : <span>No</span>;
		}
	};
	console.log(props)
	return (
		<Card style={{ textAlign: "center" }}>
			<p>{props.label}</p>
			<p>{renderMetric(props.metric)}</p>
		</Card>
	);
};

export default DataCard;
