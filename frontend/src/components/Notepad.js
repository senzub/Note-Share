import React from "react";
import { connect } from "react-redux";
import { resetDelete,resetAdd,unload,fetchUserNotepads } from "../actions/index";
import Sidebar from "./Sidebar";

class Notepad extends React.Component {
	componentDidUpdate(prevProps) {
		let loc = this.props.location.pathname;		
		const prevLoc = prevProps.location.pathname;
		if (loc !== prevLoc) {
			let idInfo = loc.split("/");
			idInfo = idInfo.filter(str => str.length>0);
			this.props.resetDelete();
			this.props.resetAdd();
			this.props.unload();
			this.props.fetchUserNotepads(idInfo[0]);			
		}			
	}
	render() {
		return (
				<Sidebar url={this.props.location.pathname} 
				gid={this.props.match.params.gid}/>
		);
	}
}

export default connect(null,{
	resetDelete,resetAdd,unload,fetchUserNotepads
})(Notepad);