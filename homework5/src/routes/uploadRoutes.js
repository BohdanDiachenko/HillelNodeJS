import express from "express";
import { uploadVideo } from "../controllers/uploadController.js";
import { upload, handleUploadError } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload, handleUploadError, uploadVideo);

export default router;
