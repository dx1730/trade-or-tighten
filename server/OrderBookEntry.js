class Order {
    constructor(orderId, username, isBuySide, price, quantity) {
        this.orderId = orderId;
        this.username = username;
        this.isBuySide = isBuySide;
        this.price = price;
        this.initialQuantity = quantity;
        this.currentQuantity = quantity;
    }

    increaseQuantity(quantityDelta) {
        this.currentQuantity += quantityDelta;
    }

    decreaseQuantity(quantityDelta) {
        if (quantityDelta > this.currentQuantity) {
            throw new Error(`Cannot decrease quantity by more than current 
            quantity for OrderId for orderId: ${this.orderId}`);
        }
        this.currentQuantity -= quantityDelta;
    }
}

class Limit {
    constructor(price) {
        this.price = price;
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        return (this.head == null) && (this.tail == null);
    }

    getLevelOrderCount() {
        let orderCount = 0;
        let headPointer = this.head;
        while (headPointer != null) {
            if (headPointer.currentOrder.currentQuantity > 0) {
                orderCount++;
            }
            headPointer = headPointer.next;
        }
        return orderCount;
    }

    getLevelQuantity() {
        let quantity = 0;
        let headPointer = this.head;
        while (headPointer != null) {
            quantity += headPointer.currentOrder.currentQuantity;
            headPointer = headPointer.next;
        }
        return quantity;
    }

    toString() {
        let result = "";
        result += `[${this.price}] `
        let headPointer = this.head;
        while (headPointer != null) {
            result += `${headPointer.currentOrder.username} (${headPointer.currentOrder.currentQuantity}) `
            headPointer = headPointer.next;
        }
        result += '\n';
        return result;
    }
}

class OrderBookEntry {
    constructor(currentOrder, parentLimit) {
        this.currentOrder = currentOrder;
        this.timestamp = Date.now();
        this.parentLimit = parentLimit;
        this.next = null;
        this.previous = null;
    }
}

module.exports = {
    Order: Order,
    Limit: Limit,
    OrderBookEntry: OrderBookEntry
}