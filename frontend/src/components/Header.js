import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import "../styles/_header.scss";
import "../styles/_profile.scss";

const renderAdmin = (userInfo) => {
	return (
		<div className="profile__container">
			<div className="profile__img-container">
				<img className="profile__img" src={`${userInfo.imageUrl}`} alt="Profile"/>
			</div>		
			<h4>
				<Link className="profile__link" to={`/${userInfo.userId}/`}>
					Go To Profile - {userInfo.name}
				</Link>
			</h4>
		</div>		
	);
};

const Header = (props) => {
	return (
		<header className="header">
			<div>
			<h2 className="heading-primary">
				<Link to="/" className="header__link">
					Note-Share
				</Link>
			</h2>	
			</div>			
			<div className="profile">
				{props.isSignedIn ? renderAdmin(props.userInfo):null}
				<div className="google-auth__container">
					<GoogleAuth />
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		userInfo: state.auth.userInfo
	};
};

export default connect(mapStateToProps)(Header);