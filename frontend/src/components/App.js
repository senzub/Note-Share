import React from "react";
import { Route,HashRouter } from "react-router-dom";

import NotepadsList from "./NotepadsList";
import Header from "./Header";
import Notepad from "./Notepad";
import NotepadContent from "./NotepadContent";
import Empty from "./Empty";
import 'semantic-ui-css/semantic.min.css';
import "../styles/_base.scss";
import "../styles/_content.scss";
import "../styles/_typography.scss";

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Header />
					<div className="container">
						<Route exact path="/" component={NotepadsList} /> 
						<div className="content">
							<Route path="/:gid" component={Notepad} />
							<Route exact path="/:gid" component={Empty} />
							<Route path="/:gid/:id" component={NotepadContent} />
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}


export default App;