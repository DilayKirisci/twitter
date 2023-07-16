const db = require("../../data/db-config");

async function getAll() {
	const users = await db("users as u")
		.leftJoin("roles as r", "u.user_id", "r.user_id")
		.select("u.*", "r.role_name");
	return users;
}

async function getById(id) {
	const user = await db("users as u")
		.where("user_id", id)
		.select("u.user_id", "u.user_name", "u.email")
		.first();
	return user;
}

async function getByEmail(email) {
	const user = await db("users").where(email).first();
	return user;
}

// async function getBy(filter) {
// 	const user = await db("users as u")
// 		.join("roles as r", "u.user_id", "r.user_id")
// 		.select("u.*", "r.role_name")
// 		.where(filter)
// 		.first();
// 	return user;
// }

async function create(user) {
	const [insertedUser] = await db("users").insert(user).returning("*");
	return insertedUser;
}
async function remove(id) {
	return db("users").where("user_id", id).del();
}

module.exports = {
	getAll,
	getByEmail,
	getById,
	create,
	remove,
};
