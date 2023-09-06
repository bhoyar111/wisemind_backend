import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Subject, Level, Class } = model;

// validation import here
import validateSubject from '../../../requests/subjectRequest';

export default {
    async getSubjectDS(req, res) {
        try {
            const classes = await Class.getDS();
            const levels = await Level.getDS();
            res.status(ok).send({ classes, levels });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getSubjects(req, res) {
        try {
            const subjects = await Subject.getList();
            res.status(ok).send({ subjects });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addSubject(req, res) {
        try {
            const { error } = validateSubject(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const subject = await Subject.saveRecord(req.body);
            if (!subject) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ subject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getSubject(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Subject.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('subject') });
            const getClass = await Class.getDS();
            const getLevel = await Level.getDS();
            res.status(ok).send({ subject: recordExist, getClass, getLevel });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateSubject(req, res) {
        try {
            const { error } = validateSubject(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Subject.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('subject') });

            const subject = await Subject.updateRecord( recordExist, req.body );
            if (!subject) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ subject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteSubject(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Subject.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('subject') });

            const subject = await Subject.deleteRecord( recordExist );
            if (!subject) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ subject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


