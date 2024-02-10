import fs from 'fs';

const dbFilePath = './src/db/db.json';

export const getUsersData = async () => {
    try {
        const data = await fs.promises.readFile(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err.message);
    }
};

export const saveUsersData = async (usersData) => {
    try {
        await fs.promises.writeFile(dbFilePath, JSON.stringify(usersData, null, 2));
    } catch (error) {
        console.error(err);
    }
};
