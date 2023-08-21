import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import bcrypt from 'bcryptjs';


import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

import { generateToken, sendResetPasswordMail } from '../../custom/secure'
// models import here
import model from '../../db/models';
const { User, Role } = model;

// validation import here
import validateUser from '../../requests/userRequest';
import validateForgetPassword from '../../requests/forgetPasswordRequest';

export default {
    async getUsers(req, res) {
        try {
          const users = await User.getList();
            res.status(ok).send({ users });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addUser(req, res) {
        try {
            const { error } = validateUser(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //check email id is already present
            const userExist = await User.checkUser(req.body);
            if (userExist) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const user = await User.saveRecord(req.body);
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ user});
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await User.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });
            const roles = await Role.getDS();
            res.status(ok).send({ user: recordExist, roles });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateUser(req, res,) {
        try {
            const { id } = req.params;

            const { error } = validateUser(req.body, id); 
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            let recordExist = await User.getRecordById(id); 
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });
            //validate email already used
            const userExist = await User.checkUser(req.body);
            if (userExist !== null && userExist.id != id) return res.status(bad_request).send({ error: { email_id: " This email has been already used."} });

            const user = await User.updateRecord( recordExist, req.body );
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ user });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await User.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('user') });

            const user = await User.deleteRecord( recordExist );
            if (!user) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ user });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getForgetPassword(req, res,) {
        try {
            const { error } = validateForgetPassword(req.body); 
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const userExist = await User.findUser(req.body);
            if (userExist) {
                const resetToken = generateToken();
                sendResetPasswordMail(userExist.email_id, resetToken);
                userExist.token = resetToken
                await userExist.save()
                res.status(ok).send({message: "Email send successfully", userExist})
            } else {
                res.status(bad_request).send({ error: { email_id: " This User not found."} })
            }

        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getResetPassword(req, res,) {
        try {
            const { token } = req.params;
            const user = await User.findOne({token});
            if (user) {
                res.status(ok).send({message: "User found successfully", user})
            } else {
                res.status(server_error).send({message: "User not found"})
            }
    
        } catch (e) {
            console.log(e);
            res.status(server_error).send({ error: "Can't find the user" });
        }
    },

    async setResetPassword(req, res,) {
        try {
            const { token } = req.params;
            const { password } = req.body;
    
            const user = await User.findOne({ token });
            if (user) {
                const newPassword = await bcrypt.hash(password, 10);
    
                user.password = newPassword;
    
                await user.save();
    
                res.status(ok).send({ message: "Password reset successfully", user });
            } else {
                res.status(server_error).send({ error: "Error in resetting password" });
            }
        } catch (e) {
            console.log(e);
            res.status(server_error).send({ error: "Internal server error" });
        }
    }    
}