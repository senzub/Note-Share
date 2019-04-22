import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userNotepadReducer from "./userNotepadReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
	auth: authReducer,
	userNotepads: userNotepadReducer,
	routing: routerReducer,
	deleted: (state=false,action) => {
		switch(action.type) {
			case "NOTE_DELETED":
				return true;
			case "NOTE_NOT_DELETED":
				return false;
			default: 
				return state; 
		}
	},
	added: (state=false,action) => {
		switch(action.type) {
			case "NOTE_ADDED":
				return true;
			case "NOTE_NOT_ADDED":
				return false;
			default: 
				return state; 
		}
	}	
});