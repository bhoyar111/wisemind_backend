import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        class_name: Joi.string().required().messages({
            'string.empty': `Class name cannot be an empty field`,
            'string.base' : `Class name should be a type of 'text'`,
            'any.required': `Class name is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}