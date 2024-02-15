import express from 'express';
import { addProduct, removeProduct, checkout } from '../controllers/cartController.js';

const router = express.Router();

router.post('/products', addProduct);
router.delete('/products/:id', removeProduct);
router.post('/checkout', checkout);

export default router;
