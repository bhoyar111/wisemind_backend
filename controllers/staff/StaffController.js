import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Staff, Role, Designation } = model;

// validation import here
import validateStaff from '../../requests/staffRequest';

export default {
    async getStaffs(req, res) {
        try {
          const staffs = await Staff.getList();
            res.status(ok).send({ staffs });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addStaff(req, res) {
        try {
            const { error } = validateStaff(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //check email id is already present
            const staffExist = await Staff.checkStaff(req.body);
            if (staffExist) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const staff = await Staff.saveRecord(req.body);
            if (!staff) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ staff });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStaff(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Staff.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staff') });
            const roles = await Role.getDS();
            const designations = await Designation.getDS();
            res.status(ok).send({ staff: recordExist, roles, designations });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateStaff(req, res,) {
        try {
            const { id } = req.params;

            const { error } = validateStaff(req.body, id); 
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            let recordExist = await Staff.getRecordById(id); 
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staff') });
            //validate email already used
            const staffExist = await Staff.checkStaff(req.body);
            if (staffExist !== null && staffExist.id != id) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const staff = await Staff.updateRecord( recordExist, req.body );
            if (!staff) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ staff});
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteStaff(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Staff.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staff') });

            const staff = await Staff.deleteRecord( recordExist );
            if (!staff) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ staff });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}