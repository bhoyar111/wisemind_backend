import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        email_id: Joi.string().email().required().messages({
            'string.base': `email should be a type of 'text'`,
            'string.email': `email should be a type of 'email'`,
            'string.empty': `email cannot be an empty field`,
            'any.required': `email is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}