import React from "react";

function DataCard(props) {
	const renderMetric = (metric) => {
		if (typeof metric === "number" || typeof metric == "string") {
			return <span>{metric}</span>;
		} else if (typeof metric === "boolean") {
			return metric ? <span>Yes</span> : <span>No</span>;
		}
	};
	return (
		<div className="card">
			<div className="card__body">
				<p className="metric_subtitle">{props.label}</p>
				{renderMetric(props.metric)}
			</div>
		</div>
	);
};

export default DataCard;
