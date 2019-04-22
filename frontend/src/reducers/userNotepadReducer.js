export default (state=[],action) => {
	let notepads = state.slice();
	switch(action.type) {
		case "FETCH_USER_NOTEPADS":
			return [...state,...action.payload];
		case "CREATE_USER_NOTEPAD":
			let notepad = {
				id: action.payload.id,
				user_id: action.payload.user_id,
				TITLE: "untitled",
				created_at: "JUST NOW"				
			};
			return [...state, notepad];
		case "DELETE_USER_NOTEPAD":
			notepads = notepads.filter(notepad => {
				return notepad.id !== action.payload.id;
			});
			return notepads;
		case "EDIT_NOTEPAD_TITLE":
			notepads = notepads.map(notepad => {
				if (String(notepad.id) === action.payload.id) {
					notepad.TITLE = action.payload.title;
					return notepad;
				} else return notepad;
			});
			return notepads;
		case "UNLOAD":
			return [];
		default: 
			return state;
	}
}
