import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        class_id: Joi.number().min(1).required().messages({
            'number.base' : `class_id should be a type of 'number'`,
            'number.empty': `class_id cannot be an empty field`,
            'number.min'  : `class_id length must be at least 1 characters`,
            'any.required': `class_id is a required field`
        }),
        subject_id: Joi.number().min(1).required().messages({
            'number.base' : `subject_id should be a type of 'number'`,
            'number.empty': `subject_id cannot be an empty field`,
            'number.min'  : `subject_id length must be at least 1 characters`,
            'any.required': `subject_id is a required field`
        }),
        exam_section: Joi.string().required().messages({
            'string.base' : `exam_section should be a type of 'text'`,
            'string.empty': `exam_section cannot be an empty field`,
            'any.required': `exam_section is a required field`
        }),
        question_name: Joi.string().required().messages({
            'string.base' : `question should be a type of 'text'`,
            'string.empty': `question cannot be an empty field`,
            'any.required': `question is a required field`
        }),
    });
    return schema.validate(requestData, {abortEarly: false});
}