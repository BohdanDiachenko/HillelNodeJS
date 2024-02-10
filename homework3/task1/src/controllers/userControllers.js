import { getUsersData, saveUsersData } from '../services/userServise.js'

export const createUser = async (req, res) => {
    try {
        const usersData = await getUsersData();
        const newUser = { ...req.body };
        usersData.users.push(newUser);
        await saveUsersData(usersData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Server Error: ${error.message}`);
    }
};

export const getUsers = async (req, res) => {
    try {
        const usersData = await getUsersData();
        res.json(usersData.users);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Server Error: ${error.message}`);
    }
};


