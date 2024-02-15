import { EventEmitter } from 'events';
import fs from 'fs/promises';

class Cart extends EventEmitter {
    constructor() {
        super();
        this.products = [];
        this.loadCartFromFile();
    }

    async loadCartFromFile() {
        try {
            const data = await fs.readFile('Task2/src/cart.json', 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error('Помилка завантаження корзини з файлу.', err);
            }
        }
    }

    async addProduct(product) {
        const existingProductIndex = this.products.findIndex(existingProduct => existingProduct.id === product.id);
        if (existingProductIndex !== -1) {
            this.products[existingProductIndex].quantity += product.quantity;
            if (this.products[existingProductIndex].quantity > 1) {
                this.products[existingProductIndex].totalPrice += product.price * product.quantity;
            }
        } else {
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                totalPrice: product.price * product.quantity
            };
            this.products.push(newProduct);
        }
        this.emit('productAdded', product);
        await this.saveCartToFile();
        return { message: 'Товар додано до корзини', cart: this.products };
    }



    async removeProduct(productId) {
        const index = this.products.findIndex(product => product.id === parseInt(productId));
        if (index !== -1) {
            if (this.products[index].quantity > 1) {
                this.products[index].quantity--;
            } else {
                const removedProduct = this.products.splice(index, 1)[0];
                this.emit('productRemoved', removedProduct);
            }
            await this.saveCartToFile();
            return { message: 'Товар видалено з корзини', cart: this.products };
        } else {
            return { message: 'Товар не знайдено у корзині', cart: this.products };
        }
    }

    async checkout(orderData) {
        const { isPaid } = orderData;
        if (!isPaid) {
            return { error: 'Замовлення не оплачено' };
        }
        const total = this.calculateTotal();
        const order = { products: this.products, totalPrice: total, ...orderData };
        this.products = [];
        this.emit('orderPlaced', order);
        await this.saveOrderToFile(order);
        await this.saveCartToFile();
        return { message: 'Замовлення оформлено', order: order };
    }

    calculateTotal() {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }


    async saveCartToFile() {
        try {
            await fs.writeFile('Task2/src/cart.json', JSON.stringify(this.products, null, 2));
            console.log('Корзина збережена у файл cart.json.');
        } catch (err) {
            console.error('Помилка збереження корзини у файл.', err);
        }
    }

    async saveOrderToFile(order) {
        try {
            let orders = [];
            try {
                const data = await fs.readFile('Task2/src/orders.json', 'utf8');
                orders = JSON.parse(data);
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    console.error('Помилка завантаження списку замовлень з файлу.', err);
                }
            }

            orders.push(order);

            await fs.writeFile('Task2/src/orders.json', JSON.stringify(orders, null, 2));
            console.log('Замовлення збережено у файл orders.json.');
        } catch (err) {
            console.error('Помилка збереження замовлення у файл.', err);
        }
    }

}

export default Cart;
