import React from "react";
import { connect } from "react-redux";
import "../styles/_notepad-toolbar.scss";

class NotepadToolBar extends React.Component {
	renderSaveText = () => {
		let { pending: p,fulfilled: f,rejected: r} = this.props;
		if (!p && !f && !r) {
			return "Save Notes";
		} else if (p) {
			return "Saving...";
		} else if (f) {
			return "Success!";
		} else if (r) {
			return "Failed! Try Again";
		}
	}
	renderBtns = () => {
		if (this.props.userInfo.userId === this.props.gid) {
			return (
				<div className="toolbar-btn-container">
					<button className="toolbar-btn" 
						onClick={this.props.addNote}>Add Note</button>
					<button className="toolbar-btn"
						onClick={this.props.saveNotes}>{this.renderSaveText()}</button>
					<button className="toolbar-btn toolbar-btn--delete" 
						onClick={this.props.deleteNotes}>Delete Notes</button>
				</div>
			);
		} else {
			return (
				<div className="toolbar-btn-container">
					<h3 className="toolbar-author">By - {this.props.author}</h3>
				</div>
			);
		}		
	}
	render() {
		if (this.props.userInfo) {
			return (
				<div className="toolbar-container">
					{this.renderBtns()}
				</div>
			);
		} else return null;
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo
	};
};

export default connect(mapStateToProps)(NotepadToolBar);