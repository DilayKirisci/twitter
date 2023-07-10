const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.get("/", (req, res) => {
	res.send("server up and running");
});

module.exports = server;
