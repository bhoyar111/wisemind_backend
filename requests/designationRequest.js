import Joi from '@hapi/joi';

export default (requestData, id = 0) => {
    const schema = Joi.object({
        designation_name: Joi.string().required().messages({
            'string.base' : `Designation name should be a type of 'text'`,
            'string.empty': `Designation name cannot be an empty field`,
            'any.required': `Designation name is a required field`
        })
    });
    return schema.validate(requestData, {abortEarly: false});
}