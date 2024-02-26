import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 },
}).single("video");

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File too large");
    }
    next();
};

export { upload, handleUploadError };
