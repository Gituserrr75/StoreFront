import client from '../database'

export type order ={
        id?:number
        user_id?:string
        status?:string
}

export default class orderModerl{
    async index(): Promise <order[]> {
        try {
         const conn = await client.connect()
        const sql =  'SELECT * FROM orders'
        const result = await conn.query(sql)
        conn.release();
        return result.rows 
        } catch (error) {
            throw new Error("cannot get orders")
            }
        }
       
        async create(o: order): Promise<order> {
            try {
          const sql = 'INSERT INTO order (user_id, status) VALUES($1, $2,) RETURNING *'
          const conn = await client.connect()
          const result = await conn.query(sql, [o.user_id, o.status,])
          const order = result.rows[0]
          conn.release()
          return order
            } catch (err) {
                throw new Error(`Could not add new order`)
            }
            }
            
            async update(o: order, id:number): Promise<order> {
                try {
              const sql = 'UPDATE order SET user_id=$1, status=$2 WHERE id=$3 RETURNING *'
              const conn = await client.connect()
              const result = await conn.query(sql, [o.user_id, o.status, id])
              const order = result.rows[0]
              conn.release()
              return order
                } catch (err) {
                    throw new Error(`Could not update order`)
                }
                }
}