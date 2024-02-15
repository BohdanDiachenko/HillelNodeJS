import fs from 'fs';
import { Transform } from "stream"

const readable = fs.createReadStream("./Task1/input.txt");
const writable = fs.createWriteStream("./Task1/output.txt");

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    },
});

readable.pipe(uppercase).pipe(writable);

writable.on('finish', () => {
    console.log('File transformed successfully.');
});

writable.on('error', (error) => {
    console.error('Error:', error);
});