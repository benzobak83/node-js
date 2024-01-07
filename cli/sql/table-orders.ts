import { conn } from 'app/globals/Sql/sql.ts'

try {
  let res = await conn.query(`CREATE TABLE orders 
		(
			id INT PRIMARY KEY AUTO_INCREMENT,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`)

  console.log(res)
} catch (e) {
  console.log(e)
}
