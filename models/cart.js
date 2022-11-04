module.exports = class Cart {
    constructor() {
        this.items = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    save(item) {
        this.items.push(item);
    }
    saveQuantity(quantity) {
        this.totalQuantity = quantity;
    }
    savePrice(price) {
        this.totalPrice = price;
    }
};
