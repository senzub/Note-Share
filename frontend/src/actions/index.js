import notepads from "../apis/notepads";

export const signIn = (userInfo) => (dispatch) => {
	let query = {
			userId: userInfo.userId,
			email: userInfo.email,
			name: userInfo.name
		};
	notepads.get(`/users/create`,{
		params: query 
	})
		.then((res) => {
			dispatch({
				type: "SIGN_IN",
				payload: userInfo
			});			
		})
		.catch((err) => {
			console.log("err");
		})
};

export const signOut = () => {
	return {
		type: "SIGN_OUT"
	};
};

export const fetchUserNotepads = (gid) => (dispatch) =>{
	notepads.get(`/notepads/${gid}`)
		.then((res) => {
			dispatch({
				type: "FETCH_USER_NOTEPADS",
				payload: res.data
			});
		})
};

export const createUserNotepad = (gid) => (dispatch) =>{
	notepads.post("/notepads/create", {gid})
		.then((res) => {
			dispatch({
				type: "CREATE_USER_NOTEPAD",
				payload: {
					id:res.data.insertId,
					user_id: gid
				}
			});	
			dispatch({
				type: "NOTE_ADDED"
			});			
		})
};

export const deleteUserNotepad = (id) => (dispatch) => {
	notepads.delete("/notepads/deletenotepad", {
		params: {id}})
		.then((res) => {
			dispatch({
				type: "DELETE_USER_NOTEPAD",
				payload: {id}
			});					
			dispatch({
				type: "NOTE_DELETED"
			});
		})
		.catch((err) => {
			console.log(err);
		})	
};

export const resetAdd = () => {
	return {
		type: "NOTE_NOT_ADDED"
	};
};

export const resetDelete = () => {
	return {
		type: "NOTE_NOT_DELETED"
	};
};

export const editNotepadTitle = (formValues) => {
	return {
		type: "EDIT_NOTEPAD_TITLE",
		payload: formValues
	};
};


export const unload = () => {
	return {
		type: "UNLOAD"
	};
};