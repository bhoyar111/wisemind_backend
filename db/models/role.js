'use strict';
export default (sequelize, DataTypes) => {
	const Role = sequelize.define('Role', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		role_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		description: {
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
		tableName: 'roles'
	});

	Role.associate = function(models) {
		// associations can be defined here
	};

	// queries and other function starts
	Role.getDS = async () => { // only for masters
		try {
			return await Role.findAll({
				where:{
					status: true
				},
				attributes: ['id','role_name']
			});
		} catch (e) {
			return [];
		}
	};
	Role.getList = async () => {
		try {
			return await Role.findAll({
				where:{
					status: true
				},
				attributes: ['id','role_name','description']
			});
		} catch (e) {
			return [];
		}
	};
	Role.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Role.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};
	Role.getRecordById = async (id) => {
		try {
			const searchRecord = await Role.findByPk(id, {
				attributes: ['id','role_name','description','status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};
	Role.updateRecord = async (record, reqData) => {
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
	Role.deleteRecord = async (record) => {
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

	return Role;
};