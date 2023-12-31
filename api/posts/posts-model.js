const db = require("../../data/db-config");

function getAll() {
	return db("posts");
}

async function getBy(filter) {
	const posts = await db("posts").where(filter);
	return posts;
}

async function getById(id) {
	const post = await db("posts").where("post_id", id).first();
	return post;
}

async function create(post) {
	const [insertedPost] = await db("posts").insert(post).returning("*");
	return insertedPost;
}

async function remove(id) {
	return db("posts").where("post_id", id).del();
}

async function update(id, post) {
	await db("posts").where("post_id", id).update({ post_body: post.post_body });
	return getById(id);
}

module.exports = {
	getAll,
	getBy,
	getById,
	create,
	remove,
	update,
};
