import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Designation } = model;

// validation import here
import validateDesignation from '../../../requests/designationRequest';

export default {
    async getDesignationDS(req, res) {
        try {
            const designations = await Designation.getDS();
            res.status(ok).send({ designations });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getDesignations(req, res) {
        try {
            const designations = await Designation.getList();
            res.status(ok).send({ designations });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addDesignation(req, res) {
        try {
            const { error } = validateDesignation(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const designation = await Designation.saveRecord(req.body);
            if (!designation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ designation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getDesignation(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Designation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('designation') });
            res.status(ok).send({ designation: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateDesignation(req, res) {
        try {
            const { error } = validateDesignation(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Designation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('designation') });

            const designation = await Designation.updateRecord( recordExist, req.body );
            if (!designation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ designation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteDesignation(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Designation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('designation') });

            const designation = await Designation.deleteRecord( recordExist );
            if (!designation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ designation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


