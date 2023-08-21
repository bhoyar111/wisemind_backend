'use strict';
export default (sequelize, DataTypes) => {
	const Exam = sequelize.define('Exam', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		exam_name: {
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
        subject_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
		outoff: {
			type: DataTypes.STRING(191),
			allowNull: true,
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
		tableName: 'exams'
	});

	Exam.associate = function(models) {
		// associations can be defined here
        Exam.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
        Exam.belongsTo(models.Level, {
            foreignKey: "level_id",
            as: "level",
		});
        Exam.belongsTo(models.Subject, {
            foreignKey: "subject_id",
            as: "subject",
		});
	};

	// queries and other function starts
	Exam.getDS = async () => { // only for masters
		try {
			return await Exam.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'exam_name', 'class_id']
			});
		} catch (e) {
			return [];
		}
	};

	Exam.getList = async () => {
		try {
            const { Class, Level, Subject } = sequelize.models;
			return await Exam.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Level, as : 'level', attributes: ['id', 'level_name'] },
					{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] }
				],
				attributes: ['id', 'exam_name', 'class_id', 'level_id', 'subject_id', 'outoff']
			});
		} catch (e) {
			return [];
		}
	};

	Exam.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Exam.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Exam.getRecordById = async (id) => {
		try {
			const searchRecord = await Exam.findByPk(id, {
				attributes: ['id', 'exam_name', 'class_id', 'level_id', 'subject_id', 'outoff', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Exam.updateRecord = async (record, reqData) => {
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
	
	Exam.deleteRecord = async (record) => {
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

	return Exam;
};