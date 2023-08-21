import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        student_id: Joi.number().min(1).required().messages({
            'number.base' : `student_id should be a type of 'number'`,
            'number.empty': `student_id cannot be an empty field`,
            'number.min'  : `student_id length must be at least 1 characters`,
            'any.required': `student_id is a required field`
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
        exam_id: Joi.number().min(1).required().messages({
            'number.base' : `exam_id should be a type of 'number'`,
            'number.empty': `exam_id cannot be an empty field`,
            'number.min'  : `exam_id length must be at least 1 characters`,
            'any.required': `exam_id is a required field`
        }),
        outoff: Joi.string().messages({
            'string.base' : `outoff should be a type of number`,
            'string.empty': `outoff cannot be an empty field`,
            'any.required': `outoff is a required field`
        }),
        obtain: Joi.string().messages({
            'string.base' : `obtain should be a type of number`,
            'string.empty': `obtain cannot be an empty field`,
            'any.required': `obtain is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}