const router = require("express").Router();
const usersModel = require("../users/users-model");
const {
	isUserAlreadyExist,
	checkPayload,
	hashedPassword,
	isUserExist,
	passwordCheck,
} = require("./auth-middleware");
const tokenHelper = require("../../helper/token-helper");

// router.post(
// 	"/register",
// 	 checkPayload,
// 	 isUserAlreadyExist,
// 	async (req, res, next) => {
// 		try {
// 			const { user_name, password, email } = req.body;
// 			const newUser = {
// 				user_name: user_name,
// 				password: password,
// 				email: email,
// 			};
// 			const insertedUser = await usersModel.create(newUser);
// 			res
// 				.status(200)
// 				.json({ message: "User successfully created.", insertedUser });
// 		} catch (err) {
// 			next(err);
// 		}
// 	}
// );

router.post(
	"/register",
	checkPayload,
	isUserAlreadyExist,
	hashedPassword,

	async (req, res, next) => {
		try {
			const { user_name, password, email } = req.body;
			const newUser = {
				user_name: user_name,
				password: password,
				email: email,
			};

			const insertedUser = await usersModel.create(newUser);
			console.log(insertedUser);
			res.json(insertedUser);
			// const token = tokenHelper.generateToken(insertedUser);
			// res.json(token);
		} catch (err) {
			next(err);
		}
	}
);

router.post("/login", isUserExist, passwordCheck, async (req, res, next) => {
	try {
		res.status(201).json({
			message: "User successfully logged in.",
			token: req.token,
		});
		console.log(token);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
