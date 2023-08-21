'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("designations", [
			{
				designation_name: "Principal",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				designation_name: "Vice Principal",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				designation_name: "Class Teachers",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				designation_name: "Teachers",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("designations", null, {});
	}
};
