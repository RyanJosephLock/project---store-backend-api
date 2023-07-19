import client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;    
}

export type OrderProduct = {
    id?: number;
    product_id: number;
    product_quantity: number;
    order_id: number ;
}

export class OrderStore {

    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows 
        } catch(err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Cannot find orders ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.user_id, o.order_status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch(err) {
            throw new Error(`Could not add new order. Error ${err}`);
        }
    }

    async addProduct(op: OrderProduct): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (product_quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [op.product_quantity, op.order_id, op.product_id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Cound not add new product ${op.product_id} to order ${op.order_id}: ${err}`)
        }
    }

}