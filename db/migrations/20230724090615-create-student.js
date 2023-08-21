'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('students', {
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
            middle_name: {
				type: Sequelize.STRING(191),
        		allowNull: false,
			},
            last_name: {
				type: Sequelize.STRING(191),
        		allowNull: false,
			},
            roll_no: {
				type: Sequelize.STRING(191),
        		allowNull: false,
			},
            class_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            section_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
            mobile_no: {
				type: Sequelize.STRING(191),
        		allowNull: false,
			},
            gender: {
				type: Sequelize.ENUM,
				values: ['male', 'female'],
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('students')
};