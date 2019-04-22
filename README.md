# Note-Share

Note-share is a visual note taking and sharing app that allows users to create draggable note texts instead of a large, singular block of text. This was my first project using MySQL and redux and helped cement MySQL commands and syntax and better understand the concept behind redux's global store. 

One particular problem I faced while building the app was noticing that the global store kept accumulating duplicates of the notes fetched from the database. I realized the solution was in the differences between class-based component and global state: while class state is destroyed and created as a component is rendered and unmounted, global state is not reset when routes are changed or components are mounted/unmounted, and must instead be reset manually. Overall this project helped me understand the core of redux's state flow and how it interacts with react.


Visit [here](https://note-share.netlify.com/)

## Prerequisites

A google developer account with a project created that whitelisted domain the app will run on. Add clientId to GoogleAuth.js component in frontend folder. MySQL workbench installed with users and notepads schemas created.

To add schemas, run 

CREATE TABLE users (
	name VARCHAR(320) NOT NULL,
	id VARCHAR(50) NOT NULL PRIMARY KEY,
	email VARCHAR(320) NOT NULL,
	created_at timestamp DEFAULT NOW()
);

CREATE TABLE notepads (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	notes JSON,
	created_at timestamp DEFAULT NOW(),
	user_id VARCHAR(50) NOT NULL,
	TITLE VARCHAR(100) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

in MySQL CLI.

## Getting Started

To run:

1. Clone this repo.
2. Open frontend and backend separately
3. Run "npm install" in each
4. In backend, create a connection pool and replace databaseInfo.js with own MySQL info
5. In frontend, run "npm start"
6. In backend, run "nodemon index"


