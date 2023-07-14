const db = require("../../data/db-config");

async function getByCommentId(id) {
	const comment = await db("comments as c")
		.where("c.comment_id", id)
		.select("c.*")
		.first();
	return comment;
}

async function getById(id) {
	const commentsOfUser = await db("comments as c")
		.where("c.user_id", id)
		.select("c.*");

	return commentsOfUser;
}

async function create(user_id, post_id, body) {
	const [created] = await db("comments as c").insert({
		user_id: user_id,
		post_id: post_id,
		comment_body: comment_body,
	});

	return getByCommentId(created);
}

async function update(user_id, post_id, comment_body) {
	const updated = await db("comments as c")
		.update({
			user_id: user_id,
			post_id: post_id,
			comment_body: comment_body,
		})
		.where({ user_id: user_id, post_id: post_id });

	return getByCommentId(updated);
}

module.exports = { getByCommentId, getById, create, update };
