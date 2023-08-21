'use strict';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
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
			allowNull: true,
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
		profile_img: {
			type: DataTypes.STRING(666),
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING(666),
			allowNull: false,
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING(666),
			allowNull: true,
			defaultValue: ''
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
		tableName: 'users'
	});

	User.associate = function(models) {
		// associations can be defined here
		User.belongsTo(models.Role, {
            foreignKey: "role_id",
            as: "role",
        })
	};

	// queries and other function starts
	// for login
	User.getUser = async (reqData) => {
		try {
			return await User.findOne({
				where: {
					email_id: reqData.email_id
				},
				attributes: [
					'id','first_name','middle_name','last_name','email_id','mobile_no','password',
					'role_id','status'
				]
			});
		} catch (e) {
			return false;
		}
	}

	User.checkUser = async (reqData) => {
		try {
			return await User.findOne({
				where: {
					email_id: reqData.email_id,
					status: true
				},
				attributes: ['id','email_id','status']
			});
		} catch (e) {
			return false;
		}
	}
	
	// for lsiting user
	User.getList = async () => {
		try {
			const { Role } = sequelize.models;
			return await User.findAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['first_name', 'ASC']],
				include:[
					{ model : Role, as : 'role', attributes: ['role_name']  }
				],
				attributes: [
					'id','first_name','middle_name','last_name','email_id','mobile_no','password',
					'role_id', 'status'
				]
			});
		} catch (e) {
			return [];
		}
	};

	User.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const hashPassword = bcrypt.hashSync(reqData.password, bcrypt.genSaltSync(10), null);
				const saveObj = {
					...reqData,
					password: hashPassword,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await User.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	User.getRecordById = async (id) => {
		try {
			const searchRecord = await User.findByPk(id, {
				attributes: ['id','first_name','middle_name','last_name','email_id','mobile_no','password',
				'profile_img','role_id', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	User.updateRecord = async (record, reqData) => {
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

	User.deleteRecord = async (record) => {
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

	User.findUser = async (reqData) => {
		try {
			return await User.findOne({
				where: {
					email_id: reqData.email_id,
					status: true
				},
				attributes: ['id', 'email_id', 'status']
			});
		} catch (e) {
			return false;
		}
	};

	User.updateUser = async (record, reqData) => {
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

    User.validatePassword = (pass, hashPass) => {
        return bcrypt.compareSync(pass, hashPass);
	}

	User.generateTokens = (userSerialize) => {
		const accessSecret = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : '';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET :'';
        return {
            access_token  : jwt.sign(userSerialize, accessSecret, { expiresIn: '6h' }),
            refresh_token : jwt.sign(userSerialize, refreshSecret)
        }
	}

	return User;
};