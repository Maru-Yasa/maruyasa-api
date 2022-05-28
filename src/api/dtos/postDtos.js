const { Joi, validate } = require('express-validation')

module.exports = {
    createPostValidation : {
        body : Joi.object({
            title : Joi.string().required(),
            author : Joi.string(),
            thumbnail : Joi.string().required(),
            content : Joi.string().required()
        })
    },

    updatePostValidation : {
        body : Joi.object({
            id : Joi.string().required(),
            title : Joi.string(),
            author : Joi.string(),
            thumbnail : Joi.string(),
            content : Joi.string()
        })
    },

    deletePostValidation : {
        body : Joi.object({
            id: Joi.string().required()
        })
    }
}