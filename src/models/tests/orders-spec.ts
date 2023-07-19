import { Order, OrderStore } from '../orders';

const store = new OrderStore()

describe("----- Orders Model -----", () => {
    
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add an order', async () => {
        const order: Order = {
            user_id: 1,
            order_status: 'open'
        };
        const newOrder = await store.create(order)
        expect(newOrder).toEqual(jasmine.objectContaining(
            {        
                user_id: 1,
                order_status: 'open'
            }
        ));
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result[result.length-1]).toEqual(jasmine.objectContaining(
            {
                "user_id": 1,
                "order_status": "open"
            }
        ));
    });

    it('show method return the correct order', async () => {
        const allOrders = await store.index();
        const result = await store.show(allOrders.length);
        expect(result).toEqual(jasmine.objectContaining(
            {
                "user_id": 1,
                "order_status": "open"
            }
        ));
    });

});
