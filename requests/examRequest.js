import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        exam_name: Joi.string().required().messages({
            'string.base' : `exam_name should be a type of 'text'`,
            'string.empty': `exam_name cannot be an empty field`,
            'any.required': `exam_name is a required field`
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
        }),
        outoff: Joi.string().required().messages({
            'string.base' : `outoff should be a type of number`,
            'string.empty': `outoff cannot be an empty field`,
            'any.required': `outoff is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}