import { conn } from 'app/globals/Sql/sql.ts'

try {
  let res = await conn.query('CREATE DATABASE IF NOT EXISTS nodejsCourse')
  console.log(res)
} catch (e) {
  console.log(e)
}
