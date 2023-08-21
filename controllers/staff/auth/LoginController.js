import sCode from "../../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error } = sCode;

import { getValidationErrMsg } from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Staff, StaffRefreshToken } = model;

// validation import here
import validateLogin from '../../../requests/staff/loginRequest';

export default {
    async getLogin(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const staff = await Staff.getStaff(req.body);
            if (!staff) return res.status(bad_request).send({ error: { email_id: "Email does't exists."} });

            if (!Staff.validatePassword(req.body.password, staff.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, email_id, first_name, last_name, role_id, mobile_no } = staff;
            const staffSerialize = { id, email_id, first_name, last_name, role_id, mobile_no };
            const token = Staff.generateTokens(staffSerialize);

            // create data for current staff in refresh token table
            const tokenSave = await StaffRefreshToken.saveStaffAndTokenData(staff, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { staff_refresh_token_id: tokenSave.id });
            res.status(ok).send({ staff, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, staff_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!staff_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await StaffRefreshToken.removeStaffToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
};