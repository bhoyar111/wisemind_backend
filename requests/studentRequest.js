import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            'string.base' : `first name should be a type of 'text'`,
            'string.empty': `first name cannot be an empty field`,
            'any.required': `first name is a required field`
        }),
        middle_name: Joi.string().required().messages({
            'string.base' : `middle name should be a type of 'text'`,
            'string.empty': `middle name cannot be an empty field`,
            'any.required': `middle name is a required field`
        }),
        last_name: Joi.string().required().messages({
            'string.base' : `last name should be a type of 'text'`,
            'string.empty': `last name cannot be an empty field`,
            'any.required': `last name is a required field`
        }),
        roll_no: Joi.string().required().messages({
            'string.base' : `roll no should be a type of 'number'`,
            'string.empty': `roll no cannot be an empty field`,
            'any.required': `roll no is a required field`
        }),
        class_id: Joi.number().min(1).required().messages({
            'number.base' : `class_id should be a type of 'number'`,
            'number.empty': `class_id cannot be an empty field`,
            'number.min'  : `class_id length must be at least 1 characters`,
            'any.required': `class_id is a required field`
        }),
        section_id: Joi.number().min(1).required().messages({
            'number.base' : `section_id should be a type of 'number'`,
            'number.empty': `section_id cannot be an empty field`,
            'number.min'  : `section_id length must be at least 1 characters`,
            'any.required': `section_id is a required field`
        }),
        mobile_no: Joi.string().required().messages({
            'string.base' : `mobile no should be a type of 'number'`,
            'string.empty': `mobile no cannot be an empty field`,
            'any.required': `mobile no is a required field`
        }),
        gender: Joi.string().allow('').required().messages({
            'string.empty': ` Gender cannot be an empty field`,
            'any.required': ` Gender is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}