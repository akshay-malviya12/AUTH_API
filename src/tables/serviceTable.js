// createTable.js
import connection from '../database.js';

const service = () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS service (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_name VARCHAR(100) NOT NULL, 
        category_id INT NOT NULL,      
        type  ENUM('Normal', 'VIP') DEFAULT 'Normal',
        price ENUM('Hourly', 'Weekly', 'Month') ,  
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE  
      );
    `;

    connection.query(query);
    console.log(' Service table created successfully!');
  } catch (err) {
    console.error(' Error when create a table :', err.message);
  }
}
export default service
