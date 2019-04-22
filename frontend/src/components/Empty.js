import React from "react";

import "../styles/_empty.scss";

class Empty extends React.Component {
	render() {
		return (
			<div className="empty">
				<h1 className="empty-heading">Click on Add Notepad to Start</h1>
			</div>
		);
	}
}

export default Empty;