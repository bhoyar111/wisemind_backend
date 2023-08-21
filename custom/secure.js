import path from 'path';

import aes256 from 'aes256';

import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

const key = 'itscaledodokey';

const cipher = aes256.createCipher(key);

export const getEncryptId = (id) => {
    return encodeURIComponent(cipher.encrypt(id.toString()));
}

export const getDecryptId = (id) => {
    return cipher.decrypt(decodeURIComponent(id));
}

export const checkDataIsValid = (data) => {
    if(data !== null && data !== undefined && data !== ''){
        return true;
    }
    return false;
}

export const pageLimit = () => {
    return 10;
}

export const moveFileFunction = async (reqFile, reqPath) => {
    return new Promise(function (fulfill, reject){
        const fileName =  Date.now() + path.extname(reqFile.name);
        reqFile.mv(reqPath + fileName, (error) => {
            if (error) {
                reject(false);
            }
            fulfill(fileName);
        })
    });
}

export const generateToken = () => {
    return randomstring.generate();
}

export const sendResetPasswordMail = async(email_id, token) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            requireTLS:true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD
            },
        });

        // const resetLink = `/reset-password/${token}`;

        const resetLink = `http://localhost:4200/reset-password/${token}`; // Add token param in frontend

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email_id,
            subject: 'Password Reset',
            text: `Please reset your password using the link provided, ${resetLink}`,
            html: `<p>Please reset your password using the link provided, <a href="${resetLink}">${resetLink}</a></p>`
        };

        mailTransporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    } catch (e) {
        console.log(e);
        res.status(server_error).send(e);
    }
}

