import Joi from 'joi';

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})

const registerSchema = Joi.object({
    userName: Joi.string().min(2).max(32).required(),
    password: Joi.string().min(8).required(),
    image: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
})

const videoSchema = Joi.object({
    title: Joi.string().min(2).max(32).required(),
    video: Joi.string().pattern(new RegExp(/\.(mp4)$/i)).required()
})


export {
    loginSchema, registerSchema, videoSchema
}
