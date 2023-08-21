'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("levels", [
			{
				level_name: "Level First",
                class_id: 1,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				level_name: "Level First",
                class_id: 2,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				level_name: "Level First",
                class_id: 3,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				level_name: "Level Second",
                class_id: 4,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				level_name: "Level Second",
                class_id: 5,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				level_name: "Level Second",
                class_id: 6,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				level_name: "Level Third",
                class_id: 7,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				level_name: "Level Third",
                class_id: 8,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("levels", null, {});
	}
};
