const usersModel = require("./users-model");
const usersMw = require("./users-middleware");
const router = require("express").Router();

router.get("/", usersMw.checkRole, async (req, res, next) => {
	try {
		const users = await usersModel.getAll();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get(
	"/:id",
	usersMw.isUserExist,
	usersMw.isOwnProfile,
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const user = await usersModel.getById(id);
			const userExceptPassword = {
				user_id: user.user_id,
				user_name: user.user_name,
				email: user.email,
			};
			res.status(200).json(userExceptPassword);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:id",
	usersMw.isUserExist,
	usersMw.isOwnProfile,
	async (req, res, next) => {
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
	}
);

module.exports = router;
