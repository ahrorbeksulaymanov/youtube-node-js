import { InternalServerError } from "../utils/errors.js";
import { read } from "../utils/index.js";

let userController = {
  GET: (req, res, next) => {
    try {
      let users = read("users").filter(user => delete user.password);
      
      let {id} = req.params;

      if(id){
        return res.status(200).send(users.find(i => i.id == id))
      }

      res.status(200).send(JSON.stringify(users));
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  }
};
export default userController;
