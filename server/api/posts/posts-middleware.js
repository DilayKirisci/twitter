const tokenHelper = require("../../helper/token-helper");
const postsModel = require("./posts-model");

const checkPayload = (req, res, next) => {
	try {
		const { post_body } = req.body;

		if (post_body.length > 0 && post_body.length <= 280) {
			next();
		} else if (post_body.length > 280) {
			res
				.status(400)
				.json({ mesasage: "Text cannot be more than 280 characters." });
		}
	} catch (error) {
		next(error);
	}
};

const isUserAllowed = async (req, res, next) => {
	try {
		const payload = tokenHelper.decodeTokensPayload(
			req.headers["authorization"]
		);
		const userId = req.params.user_id;
		if (payload.user_id == userId) {
			next();
		} else {
			res.status(400).json({
				message: `User with id:${payload.user_id} is not allowed.`,
			});
		}
	} catch (error) {
		next(error);
	}
};

const isUserOwnThisPost = async (req, res, next) => {
	try {
		const user_id = req.params.user_id;
		const post_id = req.params.post_id;
		const usersPosts = await postsModel.getBy({ user_id: user_id });
		const isAllowed = usersPosts.filter((post) => post.post_id == post_id);
		if (isAllowed.length === 0) {
			res.status(400).json({
				message: `No permission for this operation with user id:${user_id}.`,
			});
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { checkPayload, isUserAllowed, isUserOwnThisPost };
