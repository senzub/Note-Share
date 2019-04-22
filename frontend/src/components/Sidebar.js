import React from "react";
import { NavLink,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserNotepads,createUserNotepad,deleteUserNotepad,unload } from "../actions/index";

import "../styles/_sidebar.scss";

class Sidebar extends React.Component {
	state = {
		notepads: [],
		deleted: false
	};
	componentDidMount() {
		this.props.fetchUserNotepads(this.props.gid);
	}
	componentWillUnmount() {
		this.props.unload();
	}
	addNotepad = () => {
		this.props.createUserNotepad(this.props.gid);
	}
	deleteNotepad = (id) => {
		this.props.deleteUserNotepad(id);
	}	
	redirectAdd = () => {
		if (this.props.added) {
			let lastInd = this.props.notepads.length - 1;
			let latestNotepad = this.props.notepads[lastInd];
			return <Redirect to={`/${this.props.gid}/${latestNotepad.id}`} />
		} else return null;
	}
	redirectDelete = () => {
		if (this.props.deleted) {
			return <Redirect to={`/${this.props.gid}`} />
		} else return null;
	}	
	renderDeleteNotepad = (notepad) => {
		if (this.props.userInfo) {
			if (this.props.userInfo.userId === notepad.user_id) {
				return (
					<button onClick={()=>this.deleteNotepad(notepad.id)}
					className="sidebar-delete-btn">
						Delete Notepad</button>
				);
			}
		}
	}
	renderAddNotepad = () => {
		if (this.props.userInfo) {
			if (this.props.userInfo.userId === this.props.gid) {
				return (
					<button className="sidebar-add-btn" onClick={this.addNotepad}>
						Add Notepad
					</button>
				);
			}
		}
	}
	render() {
		let notepadsLinks = this.props.notepads.map((notepad,ind) => {
			let datetime = new Date(notepad.created_at);
			let title = notepad.TITLE.length > 17 ? notepad.TITLE.slice(0,17).concat("..."):notepad.TITLE;  
			return (
				<li key={ind}>
					<NavLink exact to={`/${notepad.user_id}/${notepad.id}`}
					className="sidebar-links" activeClassName="active"
					>
						<h2 className="sidebar-link-title">{title}</h2>
						<h4 className="sidebar-link-date">{notepad.created_at === "JUST NOW" ? notepad.created_at :
							`${datetime.getMonth()+1}/${datetime.getDate()}/${datetime.getFullYear()}`}
						</h4>
						{this.renderDeleteNotepad(notepad)}
					</NavLink>
				</li> 
			);
		});
		return (
			<nav className="sidebar">
				{this.redirectDelete()}
				{this.redirectAdd()}
				<h1 className="sidebar-heading">Notes</h1>
				<div className="sidebar-add-btn-container">
					{this.renderAddNotepad()}
				</div>
				<ul className="sidebar-links-ul">
					{notepadsLinks}
				</ul>
			</nav>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	let notepads = state.userNotepads;
	notepads = notepads.filter((notepad,ind) => {
		return !notepads.includes(notepad,ind+1);
	}); 
	let viewId = notepads.length>0? notepads[0].user_id: ""; 
	return {
		notepads: notepads,
		userInfo: state.auth.userInfo,
		deleted: state.deleted,
		added: state.added,
		viewId
	};
};

export default connect(mapStateToProps,{
	fetchUserNotepads,createUserNotepad,deleteUserNotepad,unload
})(Sidebar);