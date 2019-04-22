import axios from "axios";

export default axios.create({
	baseURL: "https://note-share-be.herokuapp.com"
});

//https://note-share-be.herokuapp.com/
//http://localhost:4000