import { ValidationError } from "../utils/errors.js"
import { videoSchema } from "../utils/validation.js"

export default (req, res, next) => {
    try {
        let {error} = videoSchema.validate({
            title: req.body.title,
            video: req.files.video.name
        })
        if(error) throw error
        return next()
    } catch (error) {
        return next(new ValidationError(401, error.message))
    }
}