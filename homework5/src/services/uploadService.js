import { Readable, Writable } from "stream";
import fs from "fs";

export const uploadVideo1 = (videoFile) => {
    return new Promise((resolve, reject) => {
        const outputFilePath = "src/video.mp4";

        const readableStream = new Readable({
            read(size) {
                this.push(videoFile.buffer);
                this.push(null);
            },
        });

        const writableStream = new Writable({
            write(chunk, encoding, callback) {
                fs.appendFile(outputFilePath, chunk, (err) => {
                    if (err) {
                        console.error("Error writing chunk to file:", err);
                        reject(err);
                    }
                    callback();
                });
            },
        });

        writableStream.on("error", (err) => {
            console.error("Error uploading video:", err);
            reject(err);
        });

        writableStream.on("finish", () => {
            console.log("Video upload completed");
            resolve();
        });

        readableStream.pipe(writableStream);
    });
};
