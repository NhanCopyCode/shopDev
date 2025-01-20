const express = require("express");
const compression = require("compression");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// inti middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

//init routes
app.use("/", function (req, res) {
    const strCompress = "XIn chào việt nam";
    return res.status(200).json({
        message: "Hello nhangg",
        metadata: strCompress.repeat(100000)
    })
});
// handle error

module.exports = app;
