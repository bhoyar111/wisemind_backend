import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Level, Class } = model;

// validation import here
import validateLevel from '../../../requests/levelRequest';

export default {
    async getLevelDS(req, res) {
        try {
            const classes = await Class.getDS();
            res.status(ok).send({ classes });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getLevels(req, res) {
        try {
            const levels = await Level.getList();
            res.status(ok).send({ levels });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addLevel(req, res) {
        try {
            const { error } = validateLevel(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const level = await Level.saveRecord(req.body);
            if (!level) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ level });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getLevel(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Level.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('level') });
            const getClass = await Class.getDS();
            res.status(ok).send({ level: recordExist, getClass });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateLevel(req, res) {
        try {
            const { error } = validateLevel(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Level.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('level') });

            const level = await Level.updateRecord( recordExist, req.body );
            if (!level) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ level });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteLevel(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Level.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('level') });

            const level = await Level.deleteRecord( recordExist );
            if (!level) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ level });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


