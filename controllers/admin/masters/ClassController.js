import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Class } = model;

// validation import here
import validateClass from '../../../requests/classRequest';

export default {
    async getClassDS(req, res) {
        try {
            const classes = await Class.getDS();
            res.status(ok).send({ classes });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getClasses(req, res) {
        try {
            const classes = await Class.getList();
            res.status(ok).send({ classes });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addClass(req, res) {
        try {
            const { error } = validateClass(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const addclass = await Class.saveRecord(req.body);
            if (!addclass) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ addclass });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getClass(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Class.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('class') });
            res.status(ok).send({ class: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateClass(req, res) {
        try {
            const { error } = validateClass(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Class.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('class') });

            const upclass = await Class.updateRecord( recordExist, req.body );
            if (!upclass) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ upclass });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteClass(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Class.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('class') });

            const declass = await Class.deleteRecord( recordExist );
            if (!declass) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ declass });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


