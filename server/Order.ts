export class Order {
    orderId: number;
    isBuySide: boolean;
    username: string;
    timestamp: number;
    price: number;
    initialQuantity: number;
    currentQuantity: number;
    
    constructor(orderId: number, username: string, timestamp: number, isBuySide: boolean, 
        price: number, quantity: number) {
        this.orderId = orderId;
        this.username = username;
        this.timestamp = timestamp;
        this.isBuySide = isBuySide;
        this.price = price;
        this.initialQuantity = quantity;
        this.currentQuantity = quantity;
    }

    public increaseQuantity(quantityDelta: number): void {
        this.currentQuantity += quantityDelta;
    }

    public decreaseQuantity(quantityDelta: number): void {
        if (quantityDelta > this.currentQuantity) {
            throw new Error(`Cannot decrease quantity by more than current 
            quantity for OrderId for orderId: ${this.orderId}`);
        }
        this.currentQuantity -= quantityDelta;
    }
}