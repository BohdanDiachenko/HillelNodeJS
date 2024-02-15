import { EventEmitter } from 'events';
import Cart from '../models/cartModel.js';

class CartService extends EventEmitter {
    constructor() {
        super();
        this.cart = new Cart();
        this.cart.on('productAdded', this.onProductAdded.bind(this));
        this.cart.on('productRemoved', this.onProductRemoved.bind(this));
        this.cart.on('orderPlaced', this.onOrderPlaced.bind(this));
    }
    addProduct(product) {
        return this.cart.addProduct(product);
    }
    removeProduct(productId) {
        return this.cart.removeProduct(productId);
    }
    checkout(orderData) {
        return this.cart.checkout(orderData);
    }
    onProductAdded(product) {
        console.log(`Додано товар: ${product.name}`);
    }
    onProductRemoved(product) {
        console.log(`Видалено товар: ${product.name}`);
    }
    onOrderPlaced(order) {
        console.log('Оформлене замовлення:', order);
    }
}

export default new CartService();
