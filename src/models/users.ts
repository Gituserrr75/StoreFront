import client  from "../database"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

const {pepper, saltRounds}=process.env;

export  type user = {
        id?: number
        firstname?: string
        lastname?:string
        username?: string
        password: string
};

export default class usermodel {
    async index(): Promise <user[]> {
        try {
         const conn = await client.connect()
        const sql =  'SELECT id,firstname,lastname FROM users'
        const result = await conn.query(sql)
        conn.release();
        return result.rows 
        } catch (error) {
            throw new Error("cannot get user")
            }
       }

       async show(id: string): Promise<user> {
        try {
        const sql = 'SELECT id, firstname, lastname, username FROM users WHERE id=($1)'
        const conn = await client.connect()
         const result = await conn.query(sql, [id])
         conn.release()
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user`)
        }
        }

        async update(u: user, id:number): Promise<user> {
            try {
          const sql = 'UPDATE users SET firstname=$1, lastname=$2,username=$3, WHERE id=$4 RETURNING *'
          const conn = await client.connect()
          const result = await conn.query(sql, [u.firstname, u.lastname,u.username, id])
          const user = result.rows[0]
          conn.release()
          return user
            } catch (err) {
                throw new Error(`Could not update user`)
            }
            }

            async delete(id: string): Promise<boolean> {
                try {
                const sql = 'DELETE FROM users WHERE id=($1)'
                const conn = await client.connect()
              const result = await conn.query(sql, [id])
              const user = result.rows[0]
              conn.release()
                    return user
               } catch (err) {
                 throw new Error(`Could not delete user`)
              }
              }

              async create(u:user): Promise<user> {
                try {
              const sql = 'INSERT INTO users (lastname, firstname, username, password) VALUES($1, $2, $3, $4) RETURNING *'
              const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds as string)
              );        
              const conn = await client.connect()
              const result = await conn.query(sql, [u.firstname, u.lastname,u.username, hash])
              const user = result.rows[0]
              conn.release()
              return user
                } catch (err) {
                    throw new Error(`Could not add new user`)
                }
                }
            
                async authenticate(username: string, password: string): Promise<user | null> {
                    const conn = await client.connect()
                    const sql = 'SELECT password FROM users WHERE username=($1)'
                    const result = await conn.query(sql, [username])
                    console.log(password+pepper)
                    if(result.rows.length) {
                      const user = result.rows[0]
                      console.log(user)
                      if (bcrypt.compareSync(password+pepper, user.password)) {
                        return user
                      }
                    }
                    return null
                  }
}; 