import React from "react";

import "../styles/_spinner.scss";

const Spinner = props => {
	return (
		<div id="spinner" className="ui active inverted dimmer">
			<div className="ui big text loader">{props.message}</div>
		</div>
	);
};

export default Spinner;