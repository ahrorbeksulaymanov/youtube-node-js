import { Router } from "express";
import userController from "../controllers/user.controller.js";
import tokenCheck from "../middlewares/checkToken.js";

const router = Router();

router
  .route("/users")
  .get( userController.GET)

router
  .route("/users/:id")
  .get(tokenCheck, userController.GET)

export default router;
