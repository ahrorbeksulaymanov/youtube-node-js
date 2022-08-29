import { InternalServerError, NotFoundError } from "../utils/errors.js";
import { read, write } from "../utils/index.js";
import path from "path";

let videoController = {
  GET: (req, res, next) => {
    try {
      let videos = read("videos");
      let users = read("users");
      let { userId } = req.params;
      let {user_id, search} = req.query;

      if (userId) {
            videos = videos.filter(i => {
            i.user = users.find(user => user.id == i.userId)
            delete i.user.password
            return true
          })
        return res.status(200).send(videos.filter((i) => i.userId == userId));
      }

      videos = videos.filter(i => {
        let byUserId = user_id ? user_id == i.userId : true
        let bySearch = search ? i.title.toLowerCase().includes(search.toLowerCase()) : true
        i.user = users.find(user => user.id == i.userId)
        delete i.user.password
        return bySearch && byUserId
      })
    
      res.status(200).send(JSON.stringify(videos));
    } catch (error) {
      return next(new InternalServerError(500, error.message));
    }
  },

  DOWNLOAD: (req, res, next) => {
    try {
        let { fileName } = req.params;
        let videos = read("videos");

        res.download(path.join(process.cwd(), "src", "uploads", fileName))
      } catch (error) {
        return next(new InternalServerError(500, error.message));
      }
  },

  POST: (req, res, next) => {
    try {
      let { title } = req.body;
      let videos = read("videos");
      const time = new Date();
      const video = req?.files?.video;
      let size = (+video.size/(1024*1024)).toFixed(1);
      let fileName = Date.now() + video?.name.replace(/\s/g, "");
      video.mv(path.join(process.cwd(), "src", "uploads", fileName));
      let newVideo = {
        id: videos?.at(-1)?.id + 1 || 1,
        userId: req.userId,
        title: title,
        link: fileName,
        size,
        type: video?.mimetype,
        created_at: time.getHours() + ":" + time.getMinutes(),
      };
      videos.push(newVideo);
      write("videos", videos);
      return res.status(201).send({
        status: 201,
        message: "succes",
        data: newVideo,
      });
    } catch (error) {
      return next(new InternalServerError(500, error.message));
    }
  },

  PUT: (req, res, next) => {
    try {
      let id = req.params.userId;
      let videos = read("videos");
      let findVideo = videos.find((i) => i.id == id && i.userId == req.userId);

      if (!findVideo) {
        return next(new NotFoundError(404, "video not found"));
      }
      findVideo.title = req.body.title || findVideo.title;
      write("videos", videos);
      return res.status(201).send({
        status: 201,
        message: "succes",
        data: findVideo,
      });
    } catch (error) {
      return next(new InternalServerError(500, error.message));
    }
  },

  DELETE: (req, res, next) => {
    try {
      let id = req.params.userId;
      let videos = read("videos");
      let findVideo = videos.filter((i) => i.id != id);

      if (!findVideo) {
        return next(new NotFoundError(404, "video not found"));
      }
      write("videos", videos);
      return res.status(201).send({
        status: 201,
        message: "succes deleted!",
        data: findVideo,
      });
    } catch (error) {
      return next(new InternalServerError(500, error.message));
    }
  }
};
export default videoController;
