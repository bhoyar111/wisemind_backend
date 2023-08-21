'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mark_allotments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			student_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            class_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            level_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            subject_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            exam_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			outoff: {
				type: Sequelize.STRING(191),
        		allowNull: true,
			},
            obtain: {
				type: Sequelize.STRING(191),
        		allowNull: true,
			},
			status: {
				type: Sequelize.BOOLEAN(true),
				allowNull: true,
				defaultValue: '1'
			},
			created_by: {
			  type: Sequelize.INTEGER(10),
			  allowNull: true,
			},
			updated_by: {
				type: Sequelize.INTEGER(10),
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('mark_allotments')
};