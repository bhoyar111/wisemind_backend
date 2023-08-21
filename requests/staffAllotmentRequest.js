import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        staff_id: Joi.number().min(1).required().messages({
            'number.base' : `staff_id should be a type of 'number'`,
            'number.empty': `staff_id cannot be an empty field`,
            'number.min'  : `staff_id length must be at least 1 characters`,
            'any.required': `staff_id is a required field`
        }),
        class_id: Joi.number().min(1).required().messages({
            'number.base' : `class_id should be a type of 'number'`,
            'number.empty': `class_id cannot be an empty field`,
            'number.min'  : `class_id length must be at least 1 characters`,
            'any.required': `class_id is a required field`
        }),
        level_id: Joi.number().min(1).required().messages({
            'number.base' : `level_id should be a type of 'number'`,
            'number.empty': `level_id cannot be an empty field`,
            'number.min'  : `level_id length must be at least 1 characters`,
            'any.required': `level_id is a required field`
        }),
        subject_id: Joi.number().min(1).required().messages({
            'number.base' : `subject_id should be a type of 'number'`,
            'number.empty': `subject_id cannot be an empty field`,
            'number.min'  : `subject_id length must be at least 1 characters`,
            'any.required': `subject_id is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}