import client from '../database'


export class DashboardQueries {

    async top5PopularProducts(): Promise<{productname: string, productordercount: number}[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT productname, SUM(productquantity) AS "productordercount" FROM orders INNER JOIN order_products ON orders.id = order_products.orderid INNER JOIN products ON order_products.productid = products.id GROUP BY productname, productcategory, productprice ORDER BY "productordercount" DESC LIMIT 5;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`unable get top 5 products: ${err}`)
        }
    }

    async productsByCategory(productCategory: string): Promise<{productname: string}[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT productname FROM products WHERE productcategory = $1;'
            const result = await conn.query(sql, [productCategory])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`unable get products by category ${productCategory}: ${err}`)
        }
    }

    async ordersByUserId(userId: number): Promise<{userid: string}[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT u.id AS userid, u.userfirstname, u.userlastname, o.id AS orderid, p.productname, op.productquantity FROM users u INNER JOIN orders o ON u.id = o.userid INNER JOIN order_products op ON o.id = op.orderid INNER JOIN products p ON p.id = op.productid WHERE u.id = $1;'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`unable get products by category ${userId}: ${err}`)
        }
    }

}
