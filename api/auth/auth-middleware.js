// const usersModel = require("../users/users-model");
// const { JWT_SECRET } = require("../../config/config");
// const validator = require("email-validator");

// const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");

// function checkPayloadRegister(req, res, next) {
// 	const { username, password, email } = req.body;
// 	let usernameCheck = username || username.length > 2;
// 	let passwordCheck = password || password.length > 5;
// 	let emailCheck = validator.isEmail(email);

// 	try {
// 		if (!usernameCheck) {
// 			res
// 				.status(400)
// 				.json({ message: "Username must be at least 3 characters." });
// 		} else if (!passwordCheck) {
// 			res
// 				.status(400)
// 				.json({ message: "Password must be at least 6 characters." });
// 		} else if (!emailCheck) {
// 			res.status(400).json({ message: "Email address is not valid." });
// 		} else {
// 			next();
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// }

// function checkPayloadLogin(req, res, next) {
// 	const { username, password } = req.body;
// 	try {
// 		if (!username || !password) {
// 			res.status(400).json({ message: "Username or email are required" });
// 		} else {
// 			next();
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// }

// async function isUserAlreadyExist(req, res, next) {
// 	const { username, email } = req.body;
// 	const availableUser = await usersModel.getByUsernameOrEmail({
// 		username,
// 		email,
// 	});
// 	try {
// 		if (availableUser) {
// 			return res
// 				.status(400)
// 				.json({ message: "This email address or username is already in use." });
// 		} else {
// 			next();
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// }

// async function hashedPassword(req, res, next) {
// 	try {
// 		const hashedpassword = bcryptjs.hashSync(req.body.password, 8);
// 		req.body.password = hashedpassword;
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// }

// async function isUserExist(req, res, next) {
// 	const { userPayload } = req.body;
// 	const user = await usersModel.filter({ userPayload });
// 	try {
// 		if (!user) {
// 		}
// 	} catch (err) {
// 		next(err);
// 	}
// }

// async function passwordCheck(req, res, next) {}

// module.exports = {
// 	checkPayloadRegister,
// 	checkPayloadLogin,
// 	isUserAlreadyExist,
// 	hashedPassword,
// 	isUserExist,
// 	passwordCheck,
// };
