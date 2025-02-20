"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
	db: { host, name, port },
} = require("../configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log("connectString:", connectString);

class Database {
	constructor() {
		if (Database.instance) {
			return Database.instance;
		}
		this.connect();
		Database.instance = this;
	}

	//connect
	connect(type = "mongodb") {
		if (1 === 1) {
			mongoose.set("debug", true);
			mongoose.set("debug", { color: true });
		}
		mongoose
			.connect(connectString)
			.then((_) => {
				countConnect();
				console.log(`Connect Mongodb Success Pro`);
			})
			.catch((error) => {
				console.log(`Error connect`);
			});
	}

	static getInstance() {
		if (!Database.instance) {
			return (Database.instance = new Database());
		}
		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
