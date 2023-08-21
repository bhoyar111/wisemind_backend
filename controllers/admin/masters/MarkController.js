import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Mark, Student, Exam, Subject, Level, Class } = model;

// validation import here
import validateMark from '../../../requests/markRequest';

export default {
    async getMarkDS(req, res) {
        try {
            const students = await Student.getDS();
            const classes = await Class.getDS();
            const levels = await Level.getDS();
            const subjects = await Subject.getDS();
            const exams = await Exam.getDS();
            res.status(ok).send({ students, classes, levels, subjects, exams });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getMarks(req, res) {
        try {
            const marks = await Mark.getList(req.query);
            res.status(ok).send({ marks });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },

    async addMark(req, res) {
        try {
            const { error } = validateMark(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const mark = await Mark.saveRecord(req.body);
            if (!mark) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ mark });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getMark(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Mark.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('mark') });
            const getStudent = await Student.getDS();
            const getClass = await Class.getDS();
            const getLevel = await Level.getDS();
            const getSubject = await Subject.getDS();
            const getExam = await Exam.getDS();
            res.status(ok).send({ mark: recordExist, getStudent, getClass, getLevel, getSubject, getExam });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateMark(req, res) {
        try {
            const { error } = validateMark(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Mark.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('mark') });

            const mark = await Mark.updateRecord( recordExist, req.body );
            if (!mark) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ mark });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteMark(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Mark.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('mark') });

            const mark = await Mark.deleteRecord( recordExist );
            if (!mark) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ mark });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


