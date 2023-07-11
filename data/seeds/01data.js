/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	await knex("users").insert([
		{
			username: "john_doe",
			password: "123456",
			email: "john@example.com",
			avatar_url: "https://example.com/avatar1.jpg",
		},
		{
			username: "jane_smith",
			password: "abcdef",
			email: "jane@example.com",
			avatar_url: "https://example.com/avatar2.jpg",
		},
		{
			username: "bob_jackson",
			password: "qwerty",
			email: "bob@example.com",
			avatar_url: "https://example.com/avatar3.jpg",
		},
	]);

	await knex("posts").insert([
		{
			body: "Hello world!",
			image_url: "https://example.com/image1.jpg",
			user_id: 1,
		},
		{
			body: "My vacation photos",
			image_url: "https://example.com/image2.jpg",
			user_id: 2,
		},
		{
			body: "An interesting article",
			image_url: "https://example.com/image3.jpg",
			user_id: 3,
		},
	]);

	await knex("roles").insert([
		{ rolename: "Admin", user_id: 1 },
		{ rolename: "User", user_id: 2 },
		{ rolename: "User", user_id: 3 },
	]);
	await knex("favorites").insert([
		{ user_id: 1, post_id: 1 },
		{ user_id: 1, post_id: 2 },
		{ user_id: 1, post_id: 3 },
		{ user_id: 2, post_id: 1 },
		{ user_id: 2, post_id: 3 },
		{ user_id: 3, post_id: 1 },
		{ user_id: 3, post_id: 2 },
	]);

	await knex("comments").insert([
		{
			body: "Great post!",
			image_url: "https://example.com/comment1.jpg",
			post_id: 1,
			user_id: 2,
		},
		{
			body: "Interesting topic!",
			image_url: "https://example.com/comment2.jpg",
			post_id: 2,
			user_id: 3,
		},
		{
			body: "Nice photo!",
			image_url: "https://example.com/comment3.jpg",
			post_id: 3,
			user_id: 1,
		},
	]);
};
