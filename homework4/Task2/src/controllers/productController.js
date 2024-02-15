import { getProducts } from '../services/productService.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        console.error('Помилка при отриманні продуктів:', error);
        res.status(500).json({ message: 'Помилка при отриманні продуктів.' });
    }
};


