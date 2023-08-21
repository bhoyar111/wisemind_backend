'use strict';
export default (sequelize, DataTypes) => {
	const StaffRefreshToken = sequelize.define('StaffRefreshToken', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email_id: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		refresh_token: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		tableName: 'staff_refresh_tokens'
	});

	StaffRefreshToken.associate = function(models) {
		// associations can be defined here
	};

	// queries and other functions
	StaffRefreshToken.saveStaffAndTokenData = async (staffData, tokenData) => {
		try {
            return await StaffRefreshToken.create({
                email_id: staffData.email_id,
                refresh_token: tokenData.refresh_token
            });
        } catch (e) {
            return false;
        }
	}

	StaffRefreshToken.removeStaffToken = async (reqData) => {
		try {
			const {refresh_token, staff_refresh_token_id} = reqData;
            return await StaffRefreshToken.destroy({
                where: {
                    id : staff_refresh_token_id,
                    refresh_token: refresh_token
                }
            });
        } catch (e) {
            return false;
        }
	}

	return StaffRefreshToken;
};