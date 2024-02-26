import { uploadVideo1 } from '../services/uploadService.js';

export const uploadVideo = (req, res) => {

    uploadVideo1(req.file)
        .then(() => {
            res.status(200).send('Video has been successfully uploaded!');
        })
        .catch((err) => {
            console.error('Error uploading video:', err);
            res.status(500).send('Video upload error.');
        });
};
