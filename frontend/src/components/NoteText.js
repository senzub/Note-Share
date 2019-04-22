import React from "react";
import { connect } from "react-redux";

import Draggable from 'react-draggable';

import "../styles/_notetext.scss";

class NoteText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: false,
			text: "",
			showDeleteBtn: false,
			visible: true,
			active: false
		};
	}
	componentDidMount() {
		this.setState({
			text: this.props.note.text
		});
	}
	toggleDeleteBtn = () => {
		this.setState({ showDeleteBtn: !this.state.showDeleteBtn, active: !this.state.active});
	}
	handleDrag = (e,ui) => {
		let position = {
			x: ui.x,
			y: ui.y
		};
		this.setState({position});
		this.props.updateNote(position,this.props.note);
	}
	handleChange = (e) =>{
		let text = e.target.value.replace("↵","\n");
		this.setState({text});
		this.props.updateNote(text,this.props.note);
	}
	makeEditable = (e) => {
		e.stopPropagation();
		this.setState({ editable: true, active: true });
	}
	removeEditable = (e) => {
		e.stopPropagation();
		this.setState({ editable: false, active: false });
	}	
	makeHidden = () => {
		this.setState({visible: false});
	}	
	renderDeleteBtn = () => {
		if (this.state.showDeleteBtn) {
			return (
				<div onClick={(e)=>{this.props.deleteNote(this.props.note);this.makeHidden();}}
				style={{position:"absolute"}}
				className="notetext-delete-btn">
					X
				</div>
			);
		} else return null;
	}
	renderContent = () => {
		if (!this.state.editable) {
			return (
				<div className="notetext-content">
					<p onDoubleClick={this.makeEditable}>
						{this.state.text ? this.state.text : "Double Click to Add Text"}
					</p>
				</div>
			);			
		} else {
			return (
				<textarea autoFocus={true} className="notetext-textarea"
					onBlur={this.removeEditable}
					onChange={(e)=>this.handleChange(e)}
					value={this.state.text}>
				</textarea>
			);			
		}
	}
	render() {
		const position = this.props.note.position.x ? this.props.note.position:{x: 25, y:50};
		const style = {
			position: "absolute",
			display: this.state.visible? "inline-block": "none",
			zIndex: this.state.active ? 10:0
		};
		if (this.props.userInfo) {
			if (this.props.userInfo.userId !== this.props.gid) {
				return (
					<Draggable onDrag={this.handleDrag}
						disabled={true}
						defaultPosition={position}>
						<div style={style}
								className="notetext">
							<div className="notetext-delete">
								{this.renderDeleteBtn()}
							</div>
								<div className="notetext-content">
									<p>
										{this.state.text}
									</p>
								</div>
						</div>
					</Draggable>
				);
			}
			else {
				return (
					<Draggable onDrag={this.handleDrag}
						disabled={this.state.editable? true:false}
						defaultPosition={position}>
						<div style={style} onMouseEnter={this.toggleDeleteBtn}
								onMouseLeave={this.toggleDeleteBtn}
								className="notetext">
							<div className="notetext-delete">
								{this.renderDeleteBtn()}
							</div>
							{this.renderContent()}
						</div>
					</Draggable>
				);
			}
		} else return null;
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo
	}
};

export default connect(mapStateToProps)(NoteText);