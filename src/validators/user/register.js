import Joi from "joi";

 const registerSchema = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required()
})

export default registerSchema
