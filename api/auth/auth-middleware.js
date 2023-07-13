const usersModel = require("../users/users-model");
const emailValidator = require("email-validator");
const bcryptjs = require("bcryptjs");
const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");

async function isUserAlreadyExist(req, res, next) {
	const { email } = req.body;

	try {
		const existingUser = await usersModel.getByEmail({ email: email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "This email address is already in use." });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
}
function checkPayload(req, res, next) {
	const { user_name, password, email } = req.body;

	if (!user_name || user_name.length < 3) {
		return res
			.status(400)
			.json({ message: "Username must be at least 3 characters." });
	}

	if (!password || password.length < 6) {
		return res
			.status(400)
			.json({ message: "Password must be at least 6 characters." });
	}

	if (!emailValidator.validate(email)) {
		return res.status(400).json({ message: "Email address is not valid." });
	}

	next();
}

async function hashedPassword(req, res, next) {
	try {
		const hashedpassword = bcryptjs.hashSync(req.body.password, 8);
		req.body.password = hashedpassword;
		next();
	} catch (error) {
		next(error);
	}
}

async function isUserExist(req, res, next) {
	try {
		const { email } = req.body;
		const existingUser = await usersModel.getByEmail({ email });

		if (!existingUser) {
			return res
				.status(401)
				.json({ message: "The email or password is not correct" });
		} else {
			req.currentUser = existingUser;

			next();
		}
	} catch (error) {
		next(error);
	}
}

async function passwordCheck(req, res, next) {
	const { password } = req.body;
	const dbPassword = req.currentUser.password;
	console.log(dbPassword);
	const isPasswordMatch = bcryptjs.compareSync(password, dbPassword);
	console.log(isPasswordMatch); // Check the password comparison result

	try {
		if (!isPasswordMatch) {
			res.status(401).json({ message: "Invalid user or password" });
		} else {
			let payload = {
				user_id: req.currentUser.user_id,
				user_name: req.currentUser.user_name,
				role_name: req.currentUser.role_name,
			};
			const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
			req.token = token;
			next();
		}
	} catch (error) {
		next(error);
	}
}
module.exports = {
	isUserAlreadyExist,
	checkPayload,
	hashedPassword,
	isUserExist,
	passwordCheck,
};
