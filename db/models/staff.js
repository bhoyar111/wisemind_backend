'use strict';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export default (sequelize, DataTypes) => {
	const Staff = sequelize.define('Staff', {
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
		last_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		email_id: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		mobile_no: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(666),
			allowNull: false,
		},
		school_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING(191),
			allowNull: true,
			defaultValue: 'Teacher'
		},
        designation_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN(true),
			allowNull: true,
			defaultValue: '1'
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		updated_by: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'staffs'
	});

	Staff.associate = function(models) {
		// associations can be defined here
		// Staff.belongsTo(models.Role, {
        //     foreignKey: "role_id",
        //     as: "role",
        // }),
        Staff.belongsTo(models.Designation, {
            foreignKey: "designation_id",
            as: "designation",
        }),
		Staff.belongsTo(models.School, {
            foreignKey: "school_id",
            as: "school",
        })
	};

	// queries and other function starts
	// for login
	Staff.getStaff = async (reqData) => {
		try {
			return await Staff.findOne({
				where: {
					email_id: reqData.email_id
				},
				attributes: [
					'id', 'first_name', 'last_name', 'email_id', 'mobile_no', 'password', 'school_id', 'role_id', 'role', 'status'
				]
			});
		} catch (e) {
			return false;
		}
	}

	Staff.getDS = async () => { // only for masters
		try {
			return await Staff.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'first_name', 'last_name' ]
			});
		} catch (e) {
			return [];
		}
	};

	Staff.getSchoolLevelList = async (id) => {
		try {
			const { School, Designation } = sequelize.models;
			return await Staff.findAll({
				where:{
					status: true,
					school_id: id
				},
				include:[
					{ model : School, as : 'school', attributes: ['school_name']  },
					// { model : Role, as : 'role', attributes: ['role_name']  },
					{ model : Designation, as : 'designation', attributes: ['designation_name']  }
				],
				attributes: ['id', 'first_name', 'last_name', 'email_id', 'mobile_no', 'password', 'school_id', 'role_id', 'role', 'designation_id', 'status']
			});
		} catch (e) {
			return [];
		}
	};

	Staff.checkStaff = async (reqData) => {
		try {
			return await Staff.findOne({
				where: {
					email_id: reqData.email_id,
					status: true
				},
				attributes: ['id', 'email_id', 'status']
			});
		} catch (e) {
			return false;
		}
	}
	
	// for lsiting user
	Staff.getList = async () => {
		try {
			const { School, Designation } = sequelize.models;
			return await Staff.findAll({
				where:{
					status: true
				},
				distinct: true,
				include:[
					{ model : School, as : 'school', attributes: ['school_name']  },
					// { model : Role, as : 'role', attributes: ['role_name']  },
					{ model : Designation, as : 'designation', attributes: ['designation_name']  }
				],
				attributes: [
					'id', 'first_name', 'last_name', 'email_id', 'mobile_no', 'password', 'school_id', 'role_id', 'role', 'designation_id', 'status'
				]
			});
		} catch (e) {
			return [];
		}
	};

	Staff.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const hashPassword = bcrypt.hashSync(reqData.password, bcrypt.genSaltSync(10), null);
				const saveObj = {
					...reqData,
					password: hashPassword,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Staff.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Staff.getRecordById = async (id) => {
		try {
			const searchRecord = await Staff.findByPk(id, {
				attributes: ['id', 'first_name', 'last_name', 'email_id', 'mobile_no', 'password', 'school_id',
                'role_id', 'role', 'designation_id', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Staff.updateRecord = async (record, reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				let hashPassword = record.password;
				if( reqData.password != '' ){
					hashPassword = bcrypt.hashSync(reqData.password, bcrypt.genSaltSync(10), null)
				}
				const updateObj = {
					...reqData,
					password: hashPassword,
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

	Staff.deleteRecord = async (record) => {
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

	Staff.validatePassword = (pass, hashPass) => {
        return bcrypt.compareSync(pass, hashPass);
	}

	Staff.generateTokens = (staffSerialize) => {
		const accessSecret = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : '';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET :'';
        return {
            access_token  : jwt.sign(staffSerialize, accessSecret, { expiresIn: '6h' }),
            refresh_token : jwt.sign(staffSerialize, refreshSecret)
        }
	}

	return Staff;
};