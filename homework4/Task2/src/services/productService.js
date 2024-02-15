import fs from 'fs/promises';

export const getProducts = async () => {
    try {
        const data = await fs.readFile('./Task2/src/productsDB/productsDB.json', 'utf-8');
        const products = JSON.parse(data);
        return products;
    } catch (error) {
        console.error('Помилка при отриманні продуктів:', error);
    }
};