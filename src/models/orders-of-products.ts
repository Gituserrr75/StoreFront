import client from "../database";


export type orderProducts = {
        id?: number
        quantity?: number
        order_id?: number
        product_id?:number
}


export default class orderProductsModel{
    async index(): Promise <orderProducts[]> {
        try {
         const conn = await client.connect()
        const sql =  'SELECT * FROM orders-of-products'
        const result = await conn.query(sql)
        conn.release();
        return result.rows 
        } catch (error) {
            throw new Error("cannot get orders")
            }
        }

        async create(o: orderProducts): Promise<orderProducts> {
            try {
          const sql = 'INSERT INTO orders-of-products (order_id, product_id, quantity) VALUES($1, $2,$3) RETURNING *'
          const conn = await client.connect()
          const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity])
          const order = result.rows[0]
          conn.release()
          return order
            } catch (err) {
                throw new Error(`Could not add new order`)
            }
            }
            
            async update(o: orderProducts, id:number): Promise<orderProducts> {
                try {
              const sql = 'UPDATE orders-of-products SET order_id=$1, product_id=$2, quantity=$3 WHERE id=$4 RETURNING *'
              const conn = await client.connect()
              const result = await conn.query(sql, [o.order_id, o.product_id,o.quantity, id])
              const order = result.rows[0]
              conn.release()
              return order
                } catch (err) {
                    throw new Error(`Could not update order`)
                }
                }
                async show(id: string): Promise<orderProducts> {
                    try {
                    const sql = 'SELECT * FROM orders-of-products WHERE id=($1)'
                    const conn = await client.connect()
                     const result = await conn.query(sql, [id])
                     conn.release()
                    return result.rows[0]
                    } catch (err) {
                        throw new Error(`Could not find product`)
                    }
                    }
                    async delete(id: string): Promise<orderProducts> {
                        try {
                        const sql = 'DELETE FROM orders-of-products WHERE id=($1)'
                        const conn = await client.connect()
                      const result = await conn.query(sql, [id])
                      const order = result.rows[0]
                      conn.release()
                      return order
                       } catch (err) {
                         throw new Error(`Could not delete order`)
                      }
                      }
                  
}

