import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Role } = model;

// validation import here
import validateRole from '../../../requests/roleRequest';

export default {
    async getRoleDS(req, res) {
        try {
            const roles = await Role.getDS();
            res.status(ok).send({ roles });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getRoles(req, res) {
        try {
            const roles = await Role.getList();
            res.status(ok).send({ roles });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addRole(req, res) {
        try {
            const { error } = validateRole(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const role = await Role.saveRecord(req.body);
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getRole(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Role.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });
            res.status(ok).send({ role: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateRole(req, res) {
        try {
            const { error } = validateRole(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Role.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });

            const role = await Role.updateRecord( recordExist, req.body );
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Role.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });

            const role = await Role.deleteRecord( recordExist );
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


