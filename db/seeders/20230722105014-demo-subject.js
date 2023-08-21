'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("subjects", [
			{
				subject_name: "Marathi",
                class_id: 1,
                level_id: 1,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				subject_name: "Hindi",
                class_id: 2,
                level_id: 2,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				subject_name: "Math",
                class_id: 3,
                level_id: 3,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				subject_name: "Science",
                class_id: 4,
                level_id: 4,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				subject_name: "English",
                class_id: 7,
                level_id: 7,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("subjects", null, {});
	}
};
