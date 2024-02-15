import cartService from '../services/cartService.js';

export const getProducts = async (req, res) => {
    const result = await cartService.addProducts({ id, name, price, quantity });
    res.json(result);
};
export const addProduct = async (req, res) => {
    const { id, name, price, quantity } = req.body;
    const result = await cartService.addProduct({ id, name, price, quantity });
    res.json(result);
};

export const removeProduct = async (req, res) => {
    const productId = req.params.id;
    const result = await cartService.removeProduct(productId);
    res.json(result);
};

export const checkout = async (req, res) => {
    const { firstName, lastName, address, isPaid } = req.body;
    const result = await cartService.checkout({ firstName, lastName, address, isPaid });
    res.json(result);
};
