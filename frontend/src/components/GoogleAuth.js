import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

import "../styles/_google-auth.scss";

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client.init({
				clientId: "532921942999-gv0bv0ru9qm9mkbhvg46or2q5am0emur.apps.googleusercontent.com",
				scope: "email"
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	};
	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			const profile = this.auth.currentUser.get().getBasicProfile();
			let userInfo = {
				userId: profile.getId(),
				email: profile.getEmail(),
				name: profile.getName(),
				imageUrl: profile.getImageUrl()
			};
			this.props.signIn(userInfo);
		} else {
			this.props.signOut();
		}
	};
	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};
	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui inverted massive white google button google-auth google-auth__sign-out">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} id="signin" className="ui inverted massive white google button google-auth google-auth__sign-in">
					<i className="google icon" />
					Sign In with Google
				</button>					
			);
		}
	}
	render() {
		return (
			<div>
				{this.renderAuthButton()}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		userInfo: state.auth.userInfo
	};	
};

export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth);