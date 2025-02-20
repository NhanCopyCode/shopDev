const express = require("express");
const compression = require("compression");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverloadConnect } = require("./helpers/check.connect");
require("dotenv").config();

const app = express();

// inti middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
// init db
require("./dbs/init.mongodb");
// checkOverloadConnect();

//init routes
app.use("/", require("./routes"));

// handle error

module.exports = app;
