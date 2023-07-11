const usersModel = require("./users-model");

async function isUserExist(req, res, next) {
	try {
		const userId = req.params.id;
		const userExist = await usersModel.getById(userId);
		if (!userExist) {
			res
				.status(400)
				.json({ message: `Can not found user with id: ${user_id}.` });
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
}

// const checkRole = async (req, res, next) => {
//     try {
//       const userid = tokenHelper.decodeTokensPayload(
//         req.headers["authorization"]
//       ).user_id;
//       const role = tokenHelper.decodeTokensPayload(
//         req.headers["authorization"]
//       ).rolename;
//       if (role === "Admin") {
//         next();
//       } else {
//         res.status(400).json({
//           message: `User with the id: ${userid} does not have permission for this action.`,
//         });
//       }
//     } catch (error) {}
//   };

// const isOwnProfile = async (req, res, next) => {
//     try {
//       const userParamsid = req.params.id;
//       const userid = tokenHelper.decodeTokensPayload(
//         req.headers["authorization"]
//       ).user_id;
//       const role = tokenHelper.decodeTokensPayload(
//         req.headers["authorization"]
//       ).rolename;

//       if (userParamsid == userid || role === "Admin") {
//         next();
//       } else {
//         res.status(400).json({
//           message: `User with the id: ${userid} does not have permission for this action.`,
//         });
//       }
//     } catch (error) {}
//   };

module.exports = { isUserExist };
