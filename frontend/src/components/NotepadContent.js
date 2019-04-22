import React from "react";
import { connect } from "react-redux";

import notepads from "../apis/notepads";

import { editNotepadTitle } from "../actions/index"; 
import NotepadToolBar from "./NotepadToolBar";
import NoteText from "./NoteText";
import Spinner from "./Spinner";
import NotepadTitle from "./NotepadTitle";

import "../styles/_notepad-content.scss";
import "../styles/_notes-container.scss";

class NotepadContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			 notes: [],
			 title: "",
			 isFetching: true,
			 deletedNoteInd: [],
			 pending: false,
			 fulfilled: false,
			 rejected: false
		};
	}
	componentDidMount() {
		let idsObj = this.props.match.params;
		notepads.get(`/notepads/${idsObj.gid}/${idsObj.id}`)
			.then((res) => {
				if (res.data[0]) {
					this.setState({ 
						title: res.data[0].TITLE,
						isFetching: false,
						author: res.data[0].name,
						notes: res.data[0].notes ? JSON.parse(res.data[0].notes):[]
					});
				}
			})
			.catch((err) => {
				console.log("err",err);
			});
	}
	componentDidUpdate(prevProps) {
		let loc = this.props.location.pathname;
		let prevLoc = prevProps.location.pathname;
		if (loc !== prevLoc) {
			this.setState({isFetching: true});
			notepads.get(`/notepads${loc}`)
				.then((res) => {
					if (res.data[0]) {
						this.setState({ 
							notes: res.data[0].notes ? JSON.parse(res.data[0].notes):[], 
							title: res.data[0].TITLE,
							isFetching: false
						});
					}
				})
				.catch((err) => {

				});
		}
	}
	handleTitleChange = (e) => {
		this.prevTitle = e.target.value.slice(0,-1);
		this.setState({ title: e.target.value });
	}
	saveTitle = (e) => {
		let id = this.props.match.params.id;
		let formValues = {
			id,
			title: this.state.title
		};
		notepads.put(`/notepads/updatetitle`, formValues)
			.then((res) => {
				this.props.editNotepadTitle(formValues);
			})
			.catch((err) => {
				console.log("err",err);
			});	
	}
	addNote = () => {
		let notes = this.state.notes;
		notes.push({
			text: "",
			position: {
				x: null,
				y: null
			}
		});
		this.setState({notes});
	}
	updateNote = (update,noteObj) => {
		let notes = this.state.notes;
		let ind = this.state.notes.indexOf(noteObj);

		if (typeof update === "string") {
			notes[ind].text = update.replace("↵","<br/>");
		} else {	
			notes[ind].position = update;
		}
		this.setState({notes});		
	}	
	saveNotes = (e) => {
		e.preventDefault();
		let notes = this.state.notes;
		let deletedNoteInd = this.state.deletedNoteInd;
		notes = notes.filter((ele,ind) => {
			return !deletedNoteInd.includes(ind)
		});
		this.setState({pending:true});
		notepads.put("/notepads/savenotes", {
			notes,
			id: this.props.match.params.id
		})
			.then((res) => {
				this.setState({ pending: false, fulfilled: true,rejected: false});
			})
			.catch((err) => {
				this.setState({ pending: false, rejected: true,fulfilled: false});
			});
	}
	deleteNote = (noteObj) => {
		let notes = this.state.notes;
		let ind = notes.indexOf(noteObj);
		let deletedNoteInd = this.state.deletedNoteInd;
		deletedNoteInd.push(ind);

		this.setState({deletedNoteInd});
	}
	deleteNotes = (e) => {
		e.preventDefault();
		notepads.put("/notepads/deletenotes", {
			notes: this.state.notes,
			id: this.props.match.params.id
		})
			.then((res) => {
				this.setState({notes: []});
			})
			.catch((err) => {
				console.log("err",err);
			});
	}			
	renderContent() {
		if (this.state.notes && typeof this.state.notes === "object" && !this.state.isFetching) {
			const notes = this.state.notes.map((note,ind) => {
				return (
					<NoteText key={ind}
						gid={this.props.match.params.gid}
						note={note}
						updateNote={this.updateNote}
						deleteNote={this.deleteNote}
					/>
				);
			});				
			return (
				<main>
					<NotepadToolBar 
						author={this.state.author}
						gid={this.props.match.params.gid}
						addNote={this.addNote} 
						saveNotes={this.saveNotes}
						deleteNotes={this.deleteNotes}
						deleteNotepad={this.deleteNotepad}
						pending={this.state.pending}
						rejected={this.state.rejected}
						fulfilled={this.state.fulfilled}/>
					<h2>
						<NotepadTitle 
							handleTitleChange={this.handleTitleChange}
							saveTitle={this.saveTitle}
							title={this.state.title}
							gid={this.props.match.params.gid}
						/>
					</h2>
					<div className="notes-container">
						{notes}
					</div>
				</main>
			);
		} 
		if (this.state.isFetching) {
			return <Spinner />;
		} else return null;
	}
	render() {
		return (
			<div className="notepad-content">
				{this.renderContent()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo
	}
};

export default connect(mapStateToProps,{editNotepadTitle})(NotepadContent);