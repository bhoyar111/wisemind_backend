'use strict';
export default (sequelize, DataTypes) => {
	const Mark = sequelize.define('Mark', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        student_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        class_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        level_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        subject_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        exam_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
		outoff: {
			type: DataTypes.STRING(191),
			allowNull: true,
		},
        obtain: {
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
		tableName: 'marks'
	});

	Mark.associate = function(models) {
		// associations can be defined here
        Mark.belongsTo(models.Student, {
            foreignKey: "student_id",
            as: "student",
		});
        Mark.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
        Mark.belongsTo(models.Level, {
            foreignKey: "level_id",
            as: "level",
		});
        Mark.belongsTo(models.Subject, {
            foreignKey: "subject_id",
            as: "subject",
		});
        Mark.belongsTo(models.Exam, {
            foreignKey: "exam_id",
            as: "exam",
		});
	};

	// queries and other function starts
	Mark.getList = async (reqData) => {
		const { Op } = sequelize.Sequelize;
        let filterData = { ...reqData, status: true };
		// if (reqData.outoff) {
        //     filterData.outoff = {
        //         [Op.like]: `%${reqData.outoff}%`
        //     }
        // }
		if (reqData.class_id) {
            filterData.class_id = reqData.class_id
        }

		try {
            const { Class, Level, Student, Subject, Exam } = sequelize.models;
			return await Mark.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Level, as : 'level', attributes: ['id', 'level_name'] },
					{ model : Student, as : 'student', attributes: ['id', 'first_name', 'middle_name', 'last_name'] },
					{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] },
					{ model : Exam, as : 'exam', attributes: ['id', 'exam_name', 'outoff'] }
				],
				attributes: ['id', 'student_id', 'class_id', 'level_id', 'subject_id', 'exam_id', 'outoff', 'obtain']
			});
		} catch (e) {
			return [];
		}
	};

	Mark.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Mark.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Mark.getRecordById = async (id) => {
		try {
			const searchRecord = await Mark.findByPk(id, {
				attributes: ['id', 'student_id', 'class_id', 'level_id', 'subject_id', 'exam_id', 'outoff', 'obtain', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Mark.updateRecord = async (record, reqData) => {
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

	Mark.deleteRecord = async (record) => {
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

	return Mark;
};