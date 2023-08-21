import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { StaffAllocation, Staff, Class, Level, Subject  } = model;

// validation import here
import validateStaffAllocation from '../../requests/staffAllotmentRequest';

export default {
    async getStaffAllotmentDS(req, res) {
        try {
            const staffs = await Staff.getDS();
            const classes = await Class.getDS();
            const levels = await Level.getDS();
            const subjects = await Subject.getDS();
            res.status(ok).send({ staffs, classes, levels, subjects });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },

    async getStaffAllotments(req, res) {
        try {
            const staffAllocations = await StaffAllocation.getList();
            res.status(ok).send({ staffAllocations });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addStaffAllotment(req, res) {
        try {
            const { error } = validateStaffAllocation(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const staffAllocation = await StaffAllocation.saveRecord(req.body);
            if (!staffAllocation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ staffAllocation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getStaffAllotment(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await StaffAllocation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staffallocation') });
            const getStaff = await Staff.getDS();
            const getClass = await Class.getDS();
            const getLevel = await Level.getDS();
            const getSubject = await Subject.getDS();
            res.status(ok).send({ staffAllocation: recordExist, getStaff, getClass, getLevel, getSubject });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateStaffAllotment(req, res) {
        try {
            const { error } = validateStaffAllocation(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await StaffAllocation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staffallocation') });

            const staffAllocation = await StaffAllocation.updateRecord( recordExist, req.body );
            if (!staffAllocation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ staffAllocation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteStaffAllotment(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await StaffAllocation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('staffallocation') });

            const staffAllocation = await StaffAllocation.deleteRecord( recordExist );
            if (!staffAllocation) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ staffAllocation });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}