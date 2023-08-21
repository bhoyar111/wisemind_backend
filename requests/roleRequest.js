import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        role_name: Joi.string().required().messages({
            'string.base' : `Role name should be a type of 'text'`,
            'string.empty': `Role name cannot be an empty field`,
            'any.required': `Role name is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}