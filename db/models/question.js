'use strict';
export default (sequelize, DataTypes) => {
	const Question = sequelize.define('Question', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        class_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        subject_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        exam_section: {
			type: DataTypes.ENUM,
            values: ['A', 'B'],
            allowNull: true,
        },
		question_name: {
			type: DataTypes.TEXT,
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
		tableName: 'questions'
	});

	Question.associate = function(models) {
		// associations can be defined here
        Question.belongsTo(models.Class, {
            foreignKey: "class_id",
            as: "class",
		});
        Question.belongsTo(models.Subject, {
            foreignKey: "subject_id",
            as: "subject",
		})
	};

	// queries and other function starts
	Question.getDS = async () => { // only for masters
		try {
			return await Question.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'question_name', 'exam_section']
			});
		} catch (e) {
			return [];
		}
	};

	Question.getList = async () => {
		try {
            const { Class, Subject } = sequelize.models;
			return await Question.findAll({
				where:{
					status: true
				},
                include: [
					{ model : Class, as : 'class', attributes: ['id', 'class_name'] },
					{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] }
				],
				attributes: ['id', 'class_id', 'subject_id', 'exam_section', 'question_name']
			});
		} catch (e) {
			return [];
		}
	};

	Question.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Question.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Question.getRecordById = async (id) => {
		try {
			const searchRecord = await Question.findByPk(id, {
				attributes: ['id', 'class_id', 'subject_id', 'exam_section', 'question_name', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Question.updateRecord = async (record, reqData) => {
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
	
	Question.deleteRecord = async (record) => {
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

	return Question;
};