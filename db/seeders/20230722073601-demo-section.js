'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("sections", [
			{
				section_name: " Section A",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				section_name: "Section B",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				section_name: "Section C",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("sections", null, {});
	}
};
