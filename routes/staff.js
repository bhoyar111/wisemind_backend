import express from "express";
const staffRouter = express.Router();

// import authToken from '../middleware/authToken'; // Auth token Middleware

/* Routes for Login */
import loginControl from '../controllers/staff/auth/LoginController';
staffRouter.route('/login').post(loginControl.getLogin); 
staffRouter.route('/logout').post(loginControl.getLogout);

/* Routes for Staff */
import staffControl from '../controllers/staff/StaffController';
staffRouter.route('/staffs').get(staffControl.getStaffs);
staffRouter.route('/staff-add').post(staffControl.addStaff);
staffRouter.route('/staff-get/:id').get(staffControl.getStaff);
staffRouter.route('/staff-update/:id').put(staffControl.updateStaff);
staffRouter.route('/staff-delete/:id').delete(staffControl.deleteStaff);

export default staffRouter;