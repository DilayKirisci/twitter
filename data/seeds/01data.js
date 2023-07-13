/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	await knex("users").insert([
		{
			user_name: "john_doe",
			password: "123456",
			email: "john@example.com",
		},
		{
			user_name: "jane_smith",
			password: "abcdef",
			email: "jane@example.com",
		},
		{
			user_name: "bob_jackson",
			password: "qwerty",
			email: "bob@example.com",
		},
	]);
	await knex("posts").insert([
		{
			post_body: "Hello world!",
			user_id: 1,
		},
		{
			post_body: "My vacation photos",
			user_id: 2,
		},
		{
			post_body: "An interesting article",
			user_id: 3,
		},
	]);

	await knex("roles").insert([
		{ role_name: "Admin", user_id: 1 },
		{ role_name: "User", user_id: 2 },
		{ role_name: "User", user_id: 3 },
	]);

	await knex("comments").insert([
		{
			comment_body: "Great post!",
			post_id: 1,
			user_id: 2,
		},
		{
			comment_body: "Interesting topic!",
			post_id: 2,
			user_id: 3,
		},
		{
			comment_body: "Nice photo!",
			post_id: 3,
			user_id: 1,
		},
	]);
};
