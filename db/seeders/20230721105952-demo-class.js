'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("classes", [
			{
				class_name: "First Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Second Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Third Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Fourth Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Fifth Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Six class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Seven Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				class_name: "Eight Class",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("classes", null, {});
	}
};
