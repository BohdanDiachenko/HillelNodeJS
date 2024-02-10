import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

function processImage(imageUrl, directoryPath) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

            const imageName = path.basename(imageUrl).split('?')[0].replace(/[\/\?<>\\:\*\|"]/g, '');

            const imageFileName = `${uuidv4()}-${imageName}`;

            const imagePath = path.join(directoryPath, imageFileName);

            await fs.promises.writeFile(imagePath, response.data);

            resolve(imagePath);

        } catch (error) {

            reject(error); 
        }
    });
}


const imageUrl = 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Mzke-P8i4j5ze4wuQ3hBKQ.jpeg';
const directoryPath = './images';

processImage(imageUrl, directoryPath)
    .then(savedPath => {
        console.log('The saved image is here:', savedPath);
    })
    .catch(error => {
        console.error('An error in image processing:', error);
    });
