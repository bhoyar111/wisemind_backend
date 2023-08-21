'use strict';
export default (sequelize, DataTypes) => {
	const SchoolRefreshToken = sequelize.define('SchoolRefreshToken', {
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
		tableName: 'school_refresh_tokens'
	});

	SchoolRefreshToken.associate = function(models) {
		// associations can be defined here
	};

	// queries and other functions
	SchoolRefreshToken.saveSchoolAndTokenData = async (userData, tokenData) => {
		try {
            return await SchoolRefreshToken.create({
                email_id: userData.email_id,
                refresh_token: tokenData.refresh_token
            });
        } catch (e) {
            return false;
        }
	}

	SchoolRefreshToken.removeSchoolToken = async (reqData) => {
		try {
			const {refresh_token, school_refresh_token_id} = reqData;
            return await SchoolRefreshToken.destroy({
                where: {
                    id : school_refresh_token_id,
                    refresh_token: refresh_token
                }
            });
        } catch (e) {
            return false;
        }
	}

	return SchoolRefreshToken;
};