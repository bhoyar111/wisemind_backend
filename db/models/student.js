'use strict';
export default (sequelize, DataTypes) => {
	const Student = sequelize.define('Student', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		first_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        middle_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        last_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        roll_no: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        class_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        section_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        mobile_no: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        gender: {
            type: DataTypes.ENUM,
            values: ['male', 'female'],
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
		tableName: 'students'
	});

	Student.associate = function(models) {
		// associations can be defined here
        Student.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
		Student.belongsTo(models.Exam, {
            foreignKey: "class_id",
            as: "exam",
		});
        Student.belongsTo(models.Section, {
            foreignKey: "section_id",
            as: "section",
		});
	};

	// queries and other function starts
	Student.getDS = async () => {
		try {
			return await Student.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'first_name', 'middle_name', 'last_name', 'class_id' ]
			});
		} catch (e) {
			return [];
		}
	};

	Student.getList = async () => {
		try {
            const { Class, Section } = sequelize.models;
			return await Student.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Section, as : 'section', attributes: ['id', 'section_name'] }
				],
				attributes: ['id', 'first_name', 'middle_name', 'last_name', 'roll_no', 'class_id', 'section_id', 'mobile_no', 'gender' ]
			});
		} catch (e) {
			return [];
		}
	};

	Student.getListClassWise = async () => {
		try {
            const { Class, Level, Subject, Exam, Section } = sequelize.models;
			return await Student.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Exam, as : 'exam', attributes: ['id', 'exam_name', 'class_id', 'level_id', 'subject_id', 'outoff' ],
						include : [
							{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
							{ model : Level, as : 'level', attributes: ['id', 'level_name'] },
							{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] }
						]
					},
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Section, as : 'section', attributes: ['id', 'section_name'] }
				],
				attributes: ['id', 'first_name', 'middle_name', 'last_name', 'roll_no', 'class_id', 'section_id', 'mobile_no', 'gender' ]
			});
		} catch (e) {
			return [];
		}
	};

	Student.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Student.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	Student.getRecordById = async (id) => {
		try {
			const searchRecord = await Student.findByPk(id, {
				attributes: ['id', 'first_name', 'middle_name', 'last_name', 'roll_no', 'class_id', 'section_id', 'mobile_no', 'gender', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Student.updateRecord = async (record, reqData) => {
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

	Student.deleteRecord = async (record) => {
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

	return Student;
};