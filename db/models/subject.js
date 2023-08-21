'use strict';
export default (sequelize, DataTypes) => {
	const Subject = sequelize.define('Subject', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		subject_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        class_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        level_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
		status: {
			type: DataTypes.BOOLEAN(true),
			allowNull: true,
			defaultValue: '1'
		},
		created_by: {
		  type: DataTypes.INTEGER(10),
		  allowNull: true,
		},
		updated_by: {
			type: DataTypes.INTEGER(10),
			allowNull: true,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {
		tableName: 'subjects'
	});

	Subject.associate = function(models) {
		// associations can be defined here
        Subject.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
        Subject.belongsTo(models.Level, {
            foreignKey: "level_id",
            as: "level",
		});
	};

	// queries and other function starts
	Subject.getDS = async () => { // only for masters
		try {
			return await Subject.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'subject_name', 'class_id' ]
			});
		} catch (e) {
			return [];
		}
	};
	Subject.getList = async () => {
		try {
            const { Class, Level } = sequelize.models;
			return await Subject.findAll({
				where:{
					status: true
				},
				order: [['class_id', 'ASC']],
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Level, as : 'level', attributes: ['id', 'level_name'] }
				],
				attributes: ['id', 'subject_name', 'class_id', 'level_id']
			});
		} catch (e) {
			return [];
		}
	};
	Subject.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Subject.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	Subject.getRecordById = async (id) => {
		try {
			const searchRecord = await Subject.findByPk(id, {
				attributes: ['id', 'subject_name', 'level_id', 'class_id', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};
	Subject.updateRecord = async (record, reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const updateObj = {
					...reqData,
					updatedAt: new Date()
				};
				return await record.update(updateObj, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};
	Subject.deleteRecord = async (record) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				return await record.update({
					status: false,
					updatedAt: new Date()
				}, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};

	return Subject;
};