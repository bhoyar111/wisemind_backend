'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('staffs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			first_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			email_id: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			mobile_no: {
				type: Sequelize.STRING(30),
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(666),
				allowNull: false,
			},
			school_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			role_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING(191),
				allowNull: true,
				defaultValue: 'Teacher'
			},
            designation_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN(true),
				allowNull: true,
				defaultValue: '1'
			},
			created_by: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			updated_by: {
				type: Sequelize.INTEGER(11),
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('staffs')
};