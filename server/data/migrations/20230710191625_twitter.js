/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("users", (users) => {
			users.increments("user_id");
			users.string("user_name").notNullable();
			users.string("password").notNullable();
			users.string("email").notNullable().unique();
		})
		.createTable("posts", (posts) => {
			posts.increments("post_id");
			posts.string("post_body", 280);
			posts.timestamp("created_at").defaultTo(knex.fn.now());
			posts
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("user_id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("roles", (roles) => {
			roles.increments("role_id");
			roles.string("role_name").notNullable().defaultTo("User");
			roles
				.integer("user_id")
				.notNullable()
				.references("user_id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("comments", (comments) => {
			comments.increments("comment_id");
			comments.timestamp("created_at").defaultTo(knex.fn.now());
			comments.string("comment_body", 280).notNullable();
			comments
				.integer("post_id")
				.notNullable()
				.references("post_id")
				.inTable("posts")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			comments
				.integer("user_id")
				.notNullable()
				.references("user_id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("tokenBlackList", (t) => {
			t.increments(), t.string("token").notNullable();
			t.timestamp("createdate").defaultTo(knex.fn.now());
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("tokenBlackList")
		.dropTableIfExists("comments")
		.dropTableIfExists("roles")
		.dropTableIfExists("posts")
		.dropTableIfExists("users");
};
