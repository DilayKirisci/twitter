const usersModel = require("./users-model");
const usersMw = require("./users-middleware");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
	try {
		const users = await usersModel.getAll();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", usersMw.isUserExist, async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await usersModel.getById(id);
		const userExceptPassword = {
			user_id: user.user_id,
			username: user.username,
			email: user.email,
			avatar_url: user.avatar_url,
		};
		res.status(200).json(userExceptPassword);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", usersMw.isUserExist, async (req, res, next) => {
	try {
		const id = req.params.id;
		const deletedUser = await usersModel.remove(id);
		if (!deletedUser) {
			res.status(400).json({ message: `User with id: ${id} is not found.` });
		} else {
			res
				.status(200)
				.json({ message: `User with id: ${id} removed successfully.` });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
