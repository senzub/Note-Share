const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const databaseInfo = require("./databaseInfo");

// const connection = mysql.createConnection(databaseInfo.heroku);
const connection = mysql.createPool(databaseInfo.heroku);

// connection.connect(err => {
// 	if (err) console.log(err);
// 	else console.log("Connected to mysql server");
// });

const app = express();
app.use(cors());
app.use(morgan("short"));
app.use(bodyParser.json());


// create user
app.get("/users/create", (req,res) => {
	const queryString1 = `SELECT * FROM users WHERE id=${req.query.userId}`;
	const queryString2 = `INSERT INTO users (id,name,email) VALUES ("${req.query.userId}","${req.query.name}","${req.query.email}")`;
	connection.query(queryString1, (err,results) => {
		if (err) {
			res.send(err);
		}
		else if (results.length === 0) {
			connection.query(queryString2, (err,results) => {
				if (err) {
					res.send(err);
				}
				else {
					res.send("success");
				}
			});
		} else {
			res.send("success");
		}
	});

});

// get all available notepads of all users
app.get("/notepads", (req,res) => {
	const queryString = "SELECT notepads.created_at,email,name AS author,title,users.id AS gid,notepads.id FROM users INNER JOIN notepads ON users.id = notepads.user_id";
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

// get all notepads of a user
app.get("/notepads/:gid", (req,res) => {
	const queryString = `SELECT * FROM notepads where user_id = ${req.params.gid}`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

// get specific notepad of user
app.get("/notepads/:gid/:id", (req,res) => {
	const queryString = `SELECT * FROM notepads INNER JOIN users ON notepads.user_id = users.id where user_id = ${req.params.gid} AND notepads.id = ${req.params.id}`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});


app.post("/notepads/create", (req,res) => {
	const queryString = `INSERT INTO notepads (user_id,title) VALUES (${req.body.gid},"untitled")`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});


app.put("/notepads/updatetitle", (req,res) => {
	const queryString = `UPDATE notepads SET TITLE="${req.body.title}" WHERE id=${req.body.id}`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

app.put("/notepads/savenotes", (req,res) => {
	let notes = req.body.notes;
	notes = JSON.stringify(notes);
	// const queryString = `UPDATE notepads SET notes='${notes}' WHERE id=${req.body.id}`;
	const queryString = `UPDATE notepads SET notes=? WHERE id=${req.body.id}`;
	connection.query(queryString, [notes],(err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

app.put("/notepads/deletenotes", (req,res) => {
	notes = JSON.stringify([]);
	const queryString = `UPDATE notepads SET notes='${notes}' WHERE id=${req.body.id}`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

app.delete("/notepads/deletenotepad", (req,res) => {
	const queryString = `DELETE FROM notepads WHERE id=${req.query.id}`;
	connection.query(queryString, (err,results) => {
		if (err) res.send(err);
		else {
			res.send(results);
		}
	});
});

const port = process.env.PORT || 4000;
app.listen(port, () =>{
	console.log(`server listening on port ${port}`);
});