import client from '../database'

export type product = {
    id?: number
    name: string
    price:number 
    category: string 
};

export default class ProductStore {
    async index(): Promise <product[]> {
     try {
      const conn = await client.connect()
     const sql =  'SELECT * FROM products'
     const result = await conn.query(sql)
     conn.release();
     return result.rows 
     } catch (error) {
         throw new Error("cannot get product")
         }
    }
 
    async show(id: string): Promise<product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()
         const result = await conn.query(sql, [id])
         conn.release()
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product`)
        }
        }
      async create(p: product): Promise<product> {
        try {
      const sql = 'INSERT INTO product (name, price, category) VALUES($1, $2, $3,) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [p.name, p.price, p.category])
      const product = result.rows[0]
      conn.release()
      return product
        } catch (err) {
            throw new Error(`Could not add new product`)
        }
        }
        async update(p: product, id:number): Promise<product> {
            try {
          const sql = 'UPDATE product SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *'
          const conn = await client.connect()
          const result = await conn.query(sql, [p.name, p.price, p.category, id])
          const product = result.rows[0]
          conn.release()
          return product
            } catch (err) {
                throw new Error(`Could not update product`)
            }
            }
            async delete(id: string): Promise<product> {
              try {
              const sql = 'DELETE FROM products WHERE id=($1)'
              const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
             } catch (err) {
               throw new Error(`Could not delete product`)
            }
            }
        
 };