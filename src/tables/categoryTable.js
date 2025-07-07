// createTable.js
import connection from '../database.js';


const category= ()=> {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL      
      );
    `;
    
     connection.query(query);
    console.log(' Category table created successfully!');
  } catch (err) {
    console.error(' Error when create a table :', err.message);
  }
}
export default category
