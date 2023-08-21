'use strict';
export default (sequelize, DataTypes) => {
	const StaffAllocation = sequelize.define('StaffAllocation', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        staff_id: {
            type: DataTypes.INTEGER(11),
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
        subject_id: {
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
		tableName: 'staffallotments'
	});

	StaffAllocation.associate = function(models) {
		// associations can be defined here
		StaffAllocation.belongsTo(models.Staff, {
            foreignKey: "staff_id",
            as: "staff",
		});
        StaffAllocation.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
        StaffAllocation.belongsTo(models.Level, {
            foreignKey: "level_id",
            as: "level",
		});
        StaffAllocation.belongsTo(models.Subject, {
            foreignKey: "subject_id",
            as: "subject",
		});
	};

	// queries and other function starts
	StaffAllocation.getList = async () => {
		try {
            const { Class, Level, Subject, Staff } = sequelize.models;
			return await StaffAllocation.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Staff, as : 'staff', attributes: ['id', 'first_name', 'last_name'] },
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Level, as : 'level', attributes: ['id', 'level_name'] },
					{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] }
				],
				attributes: ['id', 'staff_id', 'class_id', 'level_id', 'subject_id']
			});
		} catch (e) {
			return [];
		}
	};
	StaffAllocation.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await StaffAllocation.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	StaffAllocation.getRecordById = async (id) => {
		try {
			const searchRecord = await StaffAllocation.findByPk(id, {
				attributes: ['id', 'staff_id', 'class_id', 'level_id', 'subject_id', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};
	StaffAllocation.updateRecord = async (record, reqData) => {
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
	StaffAllocation.deleteRecord = async (record) => {
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

	return StaffAllocation;
};