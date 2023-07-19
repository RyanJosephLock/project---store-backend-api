import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_PORT,
    POSTGRES_DB_TEST,
    POSTGRES_DB_TEST_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env

let client: Pool = new Pool();

if (ENV === "test") {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        port: Number(POSTGRES_DB_TEST_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (ENV === "dev") {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: Number(POSTGRES_DB_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default client