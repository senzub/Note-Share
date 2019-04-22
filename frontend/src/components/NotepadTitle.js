import React from "react";
import { connect } from "react-redux";

import "../styles/_notepad-title.scss";

class NotepadTitle extends React.Component {
	renderTitle = () => {
		if (this.props.userInfo.userId === this.props.gid) {
			return (
				<input type="text" className="notepad-title" autoFocus={true}
					value={this.props.title==="untitled" || this.props.title==="undefined" 
						? "":this.props.title }
					onChange={this.props.handleTitleChange}
					onBlur={this.props.saveTitle}
				/>	
			);			
		} else {
			return (
				<input type="text" className="notepad-title" disabled
					value={this.props.title}
				/>				
			);
		}
	}
	render() {
		if (this.props.userInfo) {
			return (
				<React.Fragment>
					{this.renderTitle()}
				</React.Fragment>
			);
		} else return null;
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo
	}
};

export default connect(mapStateToProps)(NotepadTitle);