import express from "express";
import multer from "multer";
import * as musicController from "../controllers/music.controller.js";
import { authArtistMiddleware } from "../middlewares/auth.middleware.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/create",
  authArtistMiddleware,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  musicController.createMusic
);

router.get("/", authUserMiddleware, musicController.getAllMusic);
router.post("/playlist", authArtistMiddleware, musicController.createPlaylist);
router.get("/playlist", authUserMiddleware, musicController.getAllPlaylist);

export default router;
