// createTable.js
import connection from '../database.js';


const auth= ()=> {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS auth (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE,
        password varchar(100) NOT NULL,
        token varchar(100) NOT NULL DEFAULT 'tokenvalues',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    connection.query(query);
    console.log(' Auth table created successfully!');
  } catch (err) {
    console.error(' Error when create a table :', err.message);
  }
}
export default auth

