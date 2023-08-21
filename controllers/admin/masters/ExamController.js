import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Exam, Subject, Level, Class } = model;

// validation import here
import validateExam from '../../../requests/examRequest';

export default {
    async getExamDS(req, res) {
        try {
            const classes = await Class.getDS();
            const levels = await Level.getDS();
            const subjects = await Subject.getDS();
            res.status(ok).send({ classes, levels, subjects });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getExams(req, res) {
        try {
            const exams = await Exam.getList();
            res.status(ok).send({ exams });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addExam(req, res) {
        try {
            const { error } = validateExam(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const exam = await Exam.saveRecord(req.body);
            if (!exam) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ exam });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getExam(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Exam.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('exam') });
            const getClass = await Class.getDS();
            const getLevel = await Level.getDS();
            const getSubject = await Subject.getDS();
            res.status(ok).send({ exam: recordExist, getClass, getLevel, getSubject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateExam(req, res) {
        try {
            const { error } = validateExam(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Exam.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('exam') });

            const exam = await Exam.updateRecord( recordExist, req.body );
            if (!exam) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ exam });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteExam(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Exam.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('exam') });

            const exam = await Exam.deleteRecord( recordExist );
            if (!exam) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ exam });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


