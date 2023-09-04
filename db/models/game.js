'use strict';
export default (sequelize, DataTypes) => {
	const Game = sequelize.define('Game', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        subject_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
		game_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
        game_type: {
            type: DataTypes.ENUM,
            values: ['A', 'B'],
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
		tableName: 'games'
	});

	Game.associate = function(models) {
		// associations can be defined here
        Game.belongsTo(models.Subject, {
            foreignKey: "subject_id",
            as: "subject",
		});
	};

	// queries and other function starts
	Game.getDS = async () => { // only for masters
		try {
			return await Game.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'game_name']
			});
		} catch (e) {
			return [];
		}
	};

	Game.getList = async () => {
		try {
			const { Subject } = sequelize.models;
			return await Game.findAll({
				where:{
					status: true
				},
				include: [
					{ model : Subject, as : 'subject', attributes: ['id', 'subject_name'] }
				],
				attributes: ['id', 'game_name', 'game_type', 'subject_id']
			});
		} catch (e) {
			return [];
		}
	};

	Game.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Game.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Game.getRecordById = async (id) => {
		try {
			const searchRecord = await Game.findByPk(id, {
				attributes: ['id', 'game_name', 'game_type', "subject_id", "status"]
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Game.updateRecord = async (record, reqData) => {
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
	
	Game.deleteRecord = async (record) => {
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

	return Game;
};