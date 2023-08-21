'use strict';
export default (sequelize, DataTypes) => {
	const Designation = sequelize.define('Designation', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		designation_name: {
			type: DataTypes.STRING(191),
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
		tableName: 'designations'
	});

	Designation.associate = function(models) {
		// associations can be defined here
	};

	// queries and other function starts
	Designation.getDS = async () => { // only for masters
		try {
			return await Designation.findAll({
				where:{
					status: true
				},
				attributes: ['id','designation_name']
			});
		} catch (e) {
			return [];
		}
	};
	Designation.getList = async () => {
		try {
			return await Designation.findAll({
				where:{
					status: true
				},
				attributes: ['id','designation_name']
			});
		} catch (e) {
			return [];
		}
	};
	Designation.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Designation.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	Designation.getRecordById = async (id) => {
		try {
			const searchRecord = await Designation.findByPk(id, {
				attributes: ['id','designation_name', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};
	Designation.updateRecord = async (record, reqData) => {
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
	Designation.deleteRecord = async (record) => {
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

	return Designation;
};