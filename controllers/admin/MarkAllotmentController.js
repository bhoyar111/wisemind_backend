import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { MarkAllotment, Student, Class, Level, Subject, Exam } = model;

// validation import here
import validateMark from '../../requests/markAllocationRequest';

export default {
    async getMarkAllotmentDS(req, res) {
        try {
            const students = await Student.getListClassWise();
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

    async getMarkAllotments(req, res) {
        try {
            const markAllotments = await MarkAllotment.getList();
            res.status(ok).send({ markAllotments });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },

    async addMarkAllotment(req, res) {
        try {
            const { error } = validateMark(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const markAllotment = await MarkAllotment.saveRecord(req.body);
            if (!markAllotment) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ markAllotment });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getMarkAllotment(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await MarkAllotment.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('markAllotment') });
            const getStudent = await Student.getDS();
            const getClass = await Class.getDS();
            const getLevel = await Level.getDS();
            const getSubject = await Subject.getDS();
            const getExam = await Exam.getDS();
            res.status(ok).send({ markAllotment: recordExist, getStudent, getClass, getLevel, getSubject, getExam });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateMarkAllotment(req, res) {
        try {
            const { error } = validateMark(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await MarkAllotment.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('markAllotment') });

            const markAllotment = await MarkAllotment.updateRecord( recordExist, req.body );
            if (!markAllotment) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ markAllotment });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteMarkAllotment(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await MarkAllotment.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('markAllotment') });

            const markAllotment = await MarkAllotment.deleteRecord( recordExist );
            if (!markAllotment) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ markAllotment });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}