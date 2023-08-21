'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("roles", [
			{
				role_name: "Admin",
				description: "System Admin",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("roles", null, {});
	}
};
