import express from "express";
const apiRouter = express.Router();

import authToken from '../middleware/authToken'; // Auth token Middleware

/* Routes for Login */
import schoolLoginControl from '../controllers/admin/login/LoginController';
apiRouter.route('/login').post(schoolLoginControl.getLogin); 
apiRouter.route('/logout').post(schoolLoginControl.getLogout);

// /* Routes for staff Login */
// import loginControl from '../controllers/staff/auth/LoginController';
// apiRouter.route('/login').post(loginControl.getLogin); 
// apiRouter.route('/logout').post(loginControl.getLogout);

/* Routes for User */
import userControl from '../controllers/admin/UserController';
apiRouter.route('/users').get(authToken, userControl.getUsers);
apiRouter.route('/user-add').post(authToken, userControl.addUser);
apiRouter.route('/user-get/:id').get(authToken, userControl.getUser);
apiRouter.route('/user-update/:id').put(authToken, userControl.updateUser);
apiRouter.route('/user-delete/:id').delete(authToken, userControl.deleteUser);
apiRouter.route('/forget-password').post(userControl.getForgetPassword);
apiRouter.route('/validate-user/:token').get(userControl.getResetPassword);
apiRouter.route('/reset-password/:token').post(userControl.setResetPassword);

/* Routes for Role */
import roleControl from '../controllers/admin/masters/RoleController';
apiRouter.route('/roles-ds').get(roleControl.getRoleDS);
apiRouter.route('/roles').get(roleControl.getRoles);
apiRouter.route('/role-add').post(roleControl.addRole);
apiRouter.route('/role-get/:id').get(roleControl.getRole);
apiRouter.route('/role-update/:id').put(roleControl.updateRole);
apiRouter.route('/role-delete/:id').delete(roleControl.deleteRole);

/* Routes for Designation */
import designationControl from '../controllers/admin/masters/DesignationController';
apiRouter.route('/designation-ds').get(designationControl.getDesignationDS);
apiRouter.route('/designations').get(designationControl.getDesignations);
apiRouter.route('/designation-add').post(designationControl.addDesignation);
apiRouter.route('/designation-get/:id').get(designationControl.getDesignation);
apiRouter.route('/designation-update/:id').put(designationControl.updateDesignation);
apiRouter.route('/designation-delete/:id').delete(designationControl.deleteDesignation);

/* Routes for class */
import classControl from '../controllers/admin/masters/ClassController';
apiRouter.route('/class-ds').get(classControl.getClassDS);
apiRouter.route('/classes').get(classControl.getClasses);
apiRouter.route('/class-add').post(classControl.addClass);
apiRouter.route('/class-get/:id').get(classControl.getClass);
apiRouter.route('/class-update/:id').put(classControl.updateClass);
apiRouter.route('/class-delete/:id').delete(classControl.deleteClass);

/* Routes for Section */
import sectionControl from '../controllers/admin/masters/SectionController';
apiRouter.route('/section-ds').get(sectionControl.getSectionDS);
apiRouter.route('/sections').get(sectionControl.getSections);
apiRouter.route('/section-add').post(sectionControl.addSection);
apiRouter.route('/section-get/:id').get(sectionControl.getSection);
apiRouter.route('/section-update/:id').put(sectionControl.updateSection);
apiRouter.route('/section-delete/:id').delete(sectionControl.deleteSection);

/* Routes for Level */
import levelControl from '../controllers/admin/masters/LevelController';
apiRouter.route('/level-ds').get(levelControl.getLevelDS);
apiRouter.route('/levels').get(levelControl.getLevels);
apiRouter.route('/level-add').post(levelControl.addLevel);
apiRouter.route('/level-get/:id').get(levelControl.getLevel);
apiRouter.route('/level-update/:id').put(levelControl.updateLevel);
apiRouter.route('/level-delete/:id').delete(levelControl.deleteLevel);

/* Routes for Subject */
import subjectControl from '../controllers/admin/masters/SubjectController';
apiRouter.route('/subject-ds').get(subjectControl.getSubjecgtDS);
apiRouter.route('/subjects').get(subjectControl.getSubjects);
apiRouter.route('/subject-add').post(subjectControl.addSubject);
apiRouter.route('/subject-get/:id').get(subjectControl.getSubject);
apiRouter.route('/subject-update/:id').put(subjectControl.updateSubject);
apiRouter.route('/subject-delete/:id').delete(subjectControl.deleteSubject);

/* Routes for Exam */
import examControl from '../controllers/admin/masters/ExamController';
apiRouter.route('/exam-ds').get(examControl.getExamDS);
apiRouter.route('/exams').get(examControl.getExams);
apiRouter.route('/exam-add').post(examControl.addExam);
apiRouter.route('/exam-get/:id').get(examControl.getExam);
apiRouter.route('/exam-update/:id').put(examControl.updateExam);
apiRouter.route('/exam-delete/:id').delete(examControl.deleteExam);

/* Routes for Mark */
import markControl from '../controllers/admin/masters/MarkController';
apiRouter.route('/mark-ds').get(markControl.getMarkDS);
apiRouter.route('/marks').get(markControl.getMarks);
apiRouter.route('/mark-add').post(markControl.addMark);
apiRouter.route('/mark-get/:id').get(markControl.getMark);
apiRouter.route('/mark-update/:id').put(markControl.updateMark);
apiRouter.route('/mark-delete/:id').delete(markControl.deleteMark);

/* Routes for School */
import schoolControl from '../controllers/admin/SchoolController';
apiRouter.route('/school-ds').get(schoolControl.getSchoolDs);
apiRouter.route('/schools').get(schoolControl.getSchools);
apiRouter.route('/school-add').post(schoolControl.addSchool);
apiRouter.route('/school-get/:id').get(schoolControl.getSchool);
apiRouter.route('/school-update/:id').put(schoolControl.updateSchool);
apiRouter.route('/school-delete/:id').delete(schoolControl.deleteSchool);

/* Routes for Staff */
import staffControl from '../controllers/admin/StaffController';
apiRouter.route('/staff-ds').get(staffControl.getStaffDs);
apiRouter.route('/school-level-staff/:id').get(staffControl.getSchoolLevelStaff);
apiRouter.route('/staffs').get(staffControl.getStaffs);
apiRouter.route('/staff-add').post(staffControl.addStaff);
apiRouter.route('/staff-get/:id').get(staffControl.getStaff);
apiRouter.route('/staff-update/:id').put(staffControl.updateStaff);
apiRouter.route('/staff-delete/:id').delete(staffControl.deleteStaff);

/* Routes for Student */
import studentControl from '../controllers/admin/StudentController';
apiRouter.route('/student-ds').get(studentControl.getStudentDs);
apiRouter.route('/students').get(studentControl.getStudents);
apiRouter.route('/student-class-wise').get(studentControl.getSubjectClassWise);
apiRouter.route('/student-add').post(studentControl.addStudent);
apiRouter.route('/student-get/:id').get(studentControl.getStudent);
apiRouter.route('/student-update/:id').put(studentControl.updateStudent);
apiRouter.route('/student-delete/:id').delete(studentControl.deleteStudent);

/* Routes for Staff-Allotments */
import staffAllotmentControl from '../controllers/admin/StaffAllotmentController';
apiRouter.route('/staff-allotment-ds').get(staffAllotmentControl.getStaffAllotmentDS);
apiRouter.route('/staff-allotments').get(staffAllotmentControl.getStaffAllotments);
apiRouter.route('/staff-allotment-add').post(staffAllotmentControl.addStaffAllotment);
apiRouter.route('/staff-allotment-get/:id').get(staffAllotmentControl.getStaffAllotment);
apiRouter.route('/staff-allotment-update/:id').put(staffAllotmentControl.updateStaffAllotment);
apiRouter.route('/staff-allotment-delete/:id').delete(staffAllotmentControl.deleteStaffAllotment);

/* Routes for Mark-Allotment */
import markAllotmentControl from '../controllers/admin/MarkAllotmentController';
apiRouter.route('/mark-allotment-ds').get(markAllotmentControl.getMarkAllotmentDS);
apiRouter.route('/mark-allotments').get(markAllotmentControl.getMarkAllotments);
apiRouter.route('/mark-allotment-add').post(markAllotmentControl.addMarkAllotment);
apiRouter.route('/mark-allotment-get/:id').get(markAllotmentControl.getMarkAllotment);
apiRouter.route('/mark-allotment-update/:id').put(markAllotmentControl.updateMarkAllotment);
apiRouter.route('/mark-allotment-delete/:id').delete(markAllotmentControl.deleteMarkAllotment);

export default apiRouter;