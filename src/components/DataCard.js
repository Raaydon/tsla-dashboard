import React from "react";

const DataCard = (props) => {
	const renderMetric = (metric) => {
		if (typeof metric === "number" || typeof metric == "string") {
			return <span>{metric}</span>;
		} else if (typeof metric === "boolean") {
			return metric ? <span>Yes</span> : <span>No</span>;
		}
	};
	console.log(props);
	return (
		<div className="card">
			<div className="card__content">
				<p>{props.label}</p>
				<p>{renderMetric(props.metric)}</p>
			</div>
		</div>
	);
};

export default DataCard;
