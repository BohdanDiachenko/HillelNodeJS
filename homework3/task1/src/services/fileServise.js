import fs from 'fs';

export const ensureDbFileExists = () => {
    const dbFilePath = './task1/src/db/db.json';
    if (!fs.existsSync(dbFilePath)) {
        fs.writeFileSync(dbFilePath, JSON.stringify({ users: [] }), 'utf8');
        console.log('Created db.json file');
    }
};
