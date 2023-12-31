'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("schools", [
			{
				school_name: "Demo School",
				address: "Sankar Nagar Nagpur",
				city_name: "Nagpur",
				district_name: "Nagpur",
				state: "Nagpur",
				pin_code: "441900",
				affilition_no: "12345678",
				pin_code: "441900",
				email_id: "demo@gmail.com",
				mobile_no: "8698273854",
				password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
				role_id: 1,
				created_by: 1,
				updated_by: 1,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
  	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("schools", null, {});
	}
};
