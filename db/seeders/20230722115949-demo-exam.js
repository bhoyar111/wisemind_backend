'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("exams", [
			{
				exam_name: "First Test Series",
                class_id: 1,
                level_id: 1,
                subject_id: 1,
				outoff: "30",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				exam_name: "First Test Series",
                class_id: 2,
                level_id: 2,
                subject_id: 2,
				outoff: "30",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				exam_name: "First Test Series",
                class_id: 3,
                level_id: 3,
                subject_id: 3,
				outoff: "30",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				exam_name: "Second Test Series",
                class_id: 4,
                level_id: 4,
                subject_id: 4,
				outoff: "40",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
            {
				exam_name: "Second Test Series",
                class_id: 5,
                level_id: 5,
                subject_id: 5,
				outoff: "40",
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("exams", null, {});
	}
};
