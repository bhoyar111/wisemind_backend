import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Question, Subject, Class, Exam } = model;

// validation import here
import validateQuestion from '../../../requests/questionRequest';

export default {
    async getQuestionDS(req, res) {
        try {
            const classes = await Class.getDS();
            const subjects = await Subject.getDS();
            const exams = await Exam.getDS();
            res.status(ok).send({ classes, subjects, exams });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getQuestions(req, res) {
        try {
            const questions = await Question.getList();
            res.status(ok).send({ questions });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },

    async addQuestion(req, res) {
        try {
            const { error } = validateQuestion(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const question = await Question.saveRecord(req.body);
            if (!question) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ question });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getQuestion(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Question.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('question') });
            const getSubject = await Subject.getDS();
            res.status(ok).send({ question: recordExist, getSubject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateQuestion(req, res) {
        try {
            const { error } = validateQuestion(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Question.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('question') });

            const question = await Question.updateRecord( recordExist, req.body );
            if (!question) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ question });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteQuestion(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Question.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('question') });

            const question = await Question.deleteRecord( recordExist );
            if (!question) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ question });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


