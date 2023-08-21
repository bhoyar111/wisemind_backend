import sCode from "../../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Section } = model;

// validation import here
import validateSection from '../../../requests/sectionRequest';

export default {
    async getSectionDS(req, res) {
        try {
            const sections = await Section.getDS();
            res.status(ok).send({ sections });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getSections(req, res) {
        try {
            const sections = await Section.getList();
            res.status(ok).send({ sections });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);

        }
    },
    async addSection(req, res) {
        try {
            const { error } = validateSection(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const section = await Section.saveRecord(req.body);
            if (!section) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ section });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getSection(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Section.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('section') });
            res.status(ok).send({ section: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async updateSection(req, res) {
        try {
            const { error } = validateSection(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Section.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('section') });

            const section = await Section.updateRecord( recordExist, req.body );
            if (!section) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ section });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async deleteSection(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Section.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('section') });

            const section = await Section.deleteRecord( recordExist );
            if (!section) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ section });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}


