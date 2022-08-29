import { Router } from "express";
import videoController from "../controllers/videos.controller.js";
import tokenCheck from "../middlewares/checkToken.js";
import videosValidation from "../middlewares/videosValidation.js";

const router = Router();

router
  .route("/videos")
  .get(tokenCheck, videoController.GET)
  .post(tokenCheck, videosValidation, videoController.POST)
  
  router
  .route("/videos/:userId")
  .put(tokenCheck, videoController.PUT)
  .get(tokenCheck, videoController.GET)
  .delete(tokenCheck, videoController.DELETE)

  router
  .route("/videos/download/:fileName")
  .get(videoController.DOWNLOAD)
export default router;