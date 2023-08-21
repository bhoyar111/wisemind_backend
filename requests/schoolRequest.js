import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        school_name: Joi.string().required().messages({
            'string.base' : `school_name should be a type of 'text'`,
            'string.empty': `school_name cannot be an empty field`,
            'any.required': `school_name is a required field`
        }),
        address: Joi.string().required().messages({
            'string.base' : `address should be a type of 'text'`,
            'string.empty': `address cannot be an empty field`,
            'any.required': `address is a required field`
        }),
        city_name: Joi.string().required().messages({
            'string.base' : `city_name should be a type of 'text'`,
            'string.empty': `city_name cannot be an empty field`,
            'any.required': `city_name is a required field`
        }),
        district_name: Joi.string().required().messages({
            'string.base' : `district_name should be a type of 'text'`,
            'string.empty': `district_name cannot be an empty field`,
            'any.required': `district_name is a required field`
        }),
        state: Joi.string().required().messages({
            'string.base' : `state should be a type of 'text'`,
            'string.empty': `state cannot be an empty field`,
            'any.required': `state is a required field`
        }),
        pin_code: Joi.string().required().messages({
            'string.base' : `pin_code should be a type of 'numebr'`,
            'string.empty': `pin_code cannot be an empty field`,
            'any.required': `pin_code is a required field`
        }),
        affilition_no: Joi.string().required().messages({
            'string.base' : `affilition_no should be a type of 'number'`,
            'string.empty': `affilition_no cannot be an empty field`,
            'any.required': `affilition_no is a required field`
        }),
        email_id: Joi.string().email().required().messages({
            'string.base': `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        }),
        mobile_no: Joi.string().required().messages({
            'string.base' : `mobile no should be a type of 'number'`,
            'string.empty': `mobile no cannot be an empty field`,
            'any.required': `mobile no is a required field`
        }),
        password: (!id) ? Joi.string().required().min(8).messages({
            'string.base': `password should be a type of 'text'`,
            'string.min' : `password length must be at least 8 characters`,
            'string.empty': `password cannot be an empty field`,
            'any.required': `password is a required field`
        }) :
        Joi.string().allow('').min(8).messages({
            'string.base': `profile image should be a type of 'text'`,
            'string.base': `password should be a type of 'text'`,
            'string.min' : `password length must be at least 8 characters`
        }),
        role_id: Joi.number().min(1).required().messages({
            'number.base' : `role id should be a type of 'number'`,
            'number.empty': `role id cannot be an empty field`,
            'number.min'  : `role id length must be at least 1 characters`,
            'any.required': `role id is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}