const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

const authRouter = require("../api/auth/auth-router");
const usersRouter = require("../api/users/users-router");
const postsRouter = require("../api/posts/posts-router");
const commentsRouter = require("../api/comments/comments-router");

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);
server.use("/api/comments", commentsRouter);

server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = server;
