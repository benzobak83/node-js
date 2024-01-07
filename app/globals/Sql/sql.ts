import mariadb, { PoolConnection } from 'mariadb'

let conn: PoolConnection

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  connectionLimit: 5,
  database: 'nodejsCourse'
})

try {
  conn = await pool.getConnection()
  console.log('db connected')
} catch (e) {
  console.log('cant connect to db')
}

export { conn }
