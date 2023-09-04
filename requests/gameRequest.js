import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        subject_id: Joi.number().min(1).required().messages({
            'number.base' : `subject_id should be a type of 'number'`,
            'number.empty': `subject_id cannot be an empty field`,
            'number.min'  : `subject_id length must be at least 1 characters`,
            'any.required': `subject_id is a required field`
        }),
        game_name: Joi.string().required().messages({
            'string.base' : `game_name should be a type of 'text'`,
            'string.empty': `game_name cannot be an empty field`,
            'any.required': `game_name is a required field`
        }),
        game_type: Joi.string().required().messages({
            'string.base' : `game_type should be a type of 'text'`,
            'string.empty': `game_type cannot be an empty field`,
            'any.required': `game_type is a required field`
        }),
       
    });
    return schema.validate(requestData, {abortEarly: false});
}