'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('schools', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			school_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
            city_name: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
            district_name: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
            state: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
            pin_code: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
            affilition_no: {
				type: Sequelize.STRING(191),
				allowNull: true,
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
			role_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING(191),
				allowNull: true,
				defaultValue: 'Admin'
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('schools')
};