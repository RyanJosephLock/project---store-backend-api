import client from '../database'

export type Product = {
    id?: number;
    product_name: string;
    product_category: string;
    product_price: number;
}

export class ProductStore {
    
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows 
        } catch(err) {
            throw new Error(`Cannot get productss ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Cannot find weapon ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (product_name, product_category, product_price) VALUES($1,$2,$3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [p.product_name, p.product_category, p.product_price])
            const product = result.rows[0]
            conn.release()
            return product
        } catch(err) {
            throw new Error(`Could not add new weapon ${p.product_name}. Error ${err}`);
        }
    }

}