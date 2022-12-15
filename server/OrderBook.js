var SortedSet = require("collections/sorted-set");
var { Limit, Order, OrderBookEntry } = require("./OrderBookEntry");

function bidLimitComparer(x, y) {
    if (x.price == y.price) {
        return 0;
    }
    else if (x.price > y.price) {
        return 1;
    }
    else {
        return -1;
    }
}

function askLimitComparer(x, y) {
    if (x.price == y.price) {
        return 0;
    }
    else if (x.price > y.price) {
        return 1;
    }
    else {
        return -1;
    }
}

class OrderBook {
    constructor() {
        this.bidLimits = new SortedSet([], (x, y) => x.price == y.price, bidLimitComparer);
        this.askLimits = new SortedSet([], (x, y) => x.price == y.price, askLimitComparer);
        this.orders = {};
    }
    
    get count() {
        return Object.keys(this.orders).length;
    }

    containsOrder(orderId) {
        return (orderId in this.orders);
    }

    addOrder(order) {
        const baseLimit = new Limit(order.price);
        this.addOrderToBook(order, baseLimit, 
            order.isBuySide ? this.bidLimits : this.askLimits, this.orders);
        this.match();
    }

    addOrderToBook(order, baseLimit, limitLevels, internalBook) {
        if (limitLevels.has(baseLimit)) {
            const limit = limitLevels.get(baseLimit);
            const orderBookEntry = new OrderBookEntry(order, baseLimit);
            if (limit.tail == null) {
                limit.head = orderBookEntry;
                limit.tail = orderBookEntry;
            } else {
                let tailPointer = limit.tail;
                tailPointer.next = orderBookEntry;
                orderBookEntry.previous = tailPointer;
                limit.tail = orderBookEntry;
            }
            internalBook[order.orderId] = orderBookEntry;
        } else {
            limitLevels.add(baseLimit);
            const orderBookEntry = new OrderBookEntry(order, baseLimit);
            baseLimit.head = orderBookEntry;
            baseLimit.tail = orderBookEntry;
            // console.log(orderBookEntry);
            internalBook[order.orderId] = orderBookEntry;
        }
    }

    removeOrder(cancelOrder) {
        let id = cancelOrder.orderId;
        if (id in this.orders) {
            this.removeOrderFromBook(id, this.orders[id], 
                cancelOrder.isBuySide ? this.bidLimits : this.askLimits, this.orders);
        }
    }

    removeOrderFromBook(orderId, obe, limitLevels, internalBook) {
        // Deal with location of obe within LinkedList
        if (obe.previous != null && obe.next != null) {
            obe.next.previous = obe.previous;
            obe.previous.next = obe.next;
        } else if (obe.previous != null) {
            obe.previous.next = null;
        } else if (obe.next != null) {
            obe.next.previous = null;
        } else {
            limitLevels.remove(obe.parentLimit);
        }

        // Deal with obe on Limit level
        if (obe.parentLimit.head == obe && obe.parentLimit.tail == obe) {
            // one order on this level
            obe.parentLimit.head = null;
            obe.parentLimit.tail = null;
        } else if (obe.parentLimit.head == obe) {
            // more than one order, but obe is first order
            obe.parentLimit.head = obe.next;
        } else if (obe.parentLimit.tail == obe) {
            // more than one order, but obe is last order
            obe.parentLimit.tail = obe.previous;
        }

        delete internalBook[orderId];
    }

    getSpread() {
        let bestAsk = null;
        let bestBid = null;
        if (this.askLimits.length > 0) {
            bestAsk = this.askLimits.min().price;
        }
        if (this.bidLimits.length > 0) {
            bestBid = this.bidLimits.max().price;
        }
        return (bestAsk == null || bestBid == null) ? null : bestAsk - bestBid;
    }

    match() {
        let bestAsk = null;
        let bestBid = null;
        if (this.askLimits.length > 0) {
            bestAsk = this.askLimits.min();
        }
        if (this.bidLimits.length > 0) {
            bestBid = this.bidLimits.max();
        }
        if (bestAsk != null && bestBid != null) {
            if (bestAsk.price <= bestBid.price) {
                if (bestAsk.head == null || bestBid.head == null) {
                    throw new Error("askOrder or bidOrder is null");
                }

                let askOrder = bestAsk.head.currentOrder;
                let bidOrder = bestBid.head.currentOrder;
                let quantity = Math.min(askOrder.currentQuantity, bidOrder.currentQuantity);

                askOrder.decreaseQuantity(quantity);
                bidOrder.decreaseQuantity(quantity);

                if (askOrder.currentQuantity == 0) {
                    this.removeOrder(askOrder);
                }
                if (bidOrder.currentQuantity == 0) {
                    this.removeOrder(bidOrder);
                }
                if (bidOrder.currentQuantity > 0 || askOrder.currentQuantity > 0) {
                    this.match();
                }
            }
        }
    }

    toString() {
        let result = "";
        result += "----------Asks----------\n";
        this.askLimits.forEach((limit) => {
            result += limit.toString();
        });
        result += "----------Bids----------\n";
        this.bidLimits.forEach((limit) => {
            result += limit.toString();
        });
        return result;
    }
}

module.exports = OrderBook;