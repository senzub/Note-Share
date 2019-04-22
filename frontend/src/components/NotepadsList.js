import React from "react";

import notepads from "../apis/notepads";

import { Link } from "react-router-dom";
import "../styles/_notepads.scss";

class NotepadsList extends React.Component {
	state = {
		notepads: []
	};
	componentDidMount() {
		notepads.get("/notepads")
			.then((res) => this.setState({notepads:res.data}))
			.catch((err) => {
				console.log("err",err);
			});
	}
	render() {
		const notepads = this.state.notepads.map((notepad,id) => {
			let datetime = new Date(notepad.created_at);
			return (
				<Link key={id} to={`/${notepad.gid}/${notepad.id}`}>
					<div className="notepads__item">
						<div className="notepads__item-title-author">
							<h3 className="notepads__item-title">Title - {notepad.title}</h3>
							<h4 className="notepads__item-author">By - {notepad.author}</h4>
						</div>
						<div className="notepads__item-date">
							<h4>{`${datetime.getMonth()+1}/${datetime.getDate()}/${datetime.getFullYear()}`}</h4>
						</div>						
					</div>
				</Link>
			);
		});
		return (
			<div>
				<h2 className="notepads__heading">All Notepads</h2>
				<div className="notepads">
					<ul className="notepads__list">
						{notepads}
					</ul>
				</div>
			</div>
		);
	}
}

export default NotepadsList;