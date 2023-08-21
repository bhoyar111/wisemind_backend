import sCode from "../../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error } = sCode;

import { getValidationErrMsg } from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { School, SchoolRefreshToken } = model;

// validation import here
import validateLogin from '../../../requests/loginSchoolRequest';

export default {
    async getLogin(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const school = await School.getSchool(req.body);
            if (!school) return res.status(bad_request).send({ error: { email_id: "Email does't exists."} });

            if (!School.validatePassword(req.body.password, school.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, email_id, school_name, role_id, mobile_no, role } = school;
            const schoolSerialize = { id, email_id, school_name, role_id, mobile_no, role };
            const token = School.generateTokens(schoolSerialize);

            // create data for current School in refresh token table
            const tokenSave = await SchoolRefreshToken.saveSchoolAndTokenData(school, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { school_refresh_token_id: tokenSave.id });
            res.status(ok).send(school);
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, school_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!school_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await SchoolRefreshToken.removeSchoolToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
};