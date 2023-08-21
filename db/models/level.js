'use strict';
export default (sequelize, DataTypes) => {
	const Level = sequelize.define('Level', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		level_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        class_id: {
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
		tableName: 'levels'
	});

	Level.associate = function(models) {
		// associations can be defined here
        Level.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
	};

	// queries and other function starts
	Level.getDS = async () => { // only for masters
		try {
			return await Level.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'level_name', 'class_id']
			});
		} catch (e) {
			return [];
		}
	};
	Level.getList = async () => {
		try {
            const { Class } = sequelize.models;
			return await Level.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] }
				],
				attributes: ['id', 'level_name', 'class_id']
			});
		} catch (e) {
			return [];
		}
	};
	Level.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Level.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	Level.getRecordById = async (id) => {
		try {
			const searchRecord = await Level.findByPk(id, {
				attributes: ['id', 'level_name', 'class_id', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};
	Level.updateRecord = async (record, reqData) => {
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
	Level.deleteRecord = async (record) => {
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

	return Level;
};