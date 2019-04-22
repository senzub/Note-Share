const INITIAL_STATE = {
	isSignedIn: null,
	userId: null,
	userInfo: {}
};

export default (state = INITIAL_STATE,action) => {
	switch(action.type) {
		case "SIGN_IN":
			return {
				...state,
				isSignedIn: true,
				userInfo: action.payload
			};
		case "SIGN_OUT": 
			return {
				...state,
				isSignedIn: false,
				userInfo: {}
			};
		default:
			return state;
	}
};