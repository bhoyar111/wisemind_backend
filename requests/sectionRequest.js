import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        section_name: Joi.string().required().messages({
            'string.base' : `Section name should be a type of 'text'`,
            'string.empty': `Section name cannot be an empty field`,
            'any.required': `Section name is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}