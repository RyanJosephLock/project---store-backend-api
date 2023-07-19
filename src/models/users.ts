import client from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id?: number;
    user_firstname: string;
    user_lastname: string;
    user_password: string;
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows 
        } catch(err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id = ($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (user_firstname, user_lastname, user_password) VALUES($1,$2,$3) RETURNING *'
            const conn = await client.connect()

            const hash = bcrypt.hashSync(
                u.user_password,
                parseInt(String(process.env.SALT_ROUNDS))
            )
            
            const result = await conn.query(sql, [u.user_firstname, u.user_lastname, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(err) {
            throw new Error(`Could not add new user ${u.user_firstname} ${u.user_lastname}. Error ${err}`);
        }
    }

    async authenticate(user_firstname: string, entered_password: string): Promise<User | null> {
        const sql = 'SELECT user_password FROM users WHERE user_firstname = ($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [user_firstname])

        if(result.rows.length) {
            const user = result.rows[0]
            console.log(user)
            if(bcrypt.compareSync(entered_password, user.user_password)) {
                return user
            }
        }
        
        return null
    }
    
}