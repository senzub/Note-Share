const local = {
	host: "localhost",
	user: "root",
	password: "shimishamashomo27!",
	database: "note-share",
	multipleStatements: true,
	supportBigNumbers: true,
	bigNumberStrings: true,
	connectionLimit: 10	
};

const heroku = {
	host: "us-cdbr-iron-east-02.cleardb.net",
	database: "heroku_42cf02865ecd114",
	user: "b8a800f20d004e",
	password: "c4969ab1",
	multipleStatements: true,
	supportBigNumbers: true,
	bigNumberStrings: true,
	connectionLimit: 10		
};


module.exports = {
	local,
	heroku
};