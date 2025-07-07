// createTable.js
import connection from '../database.js';


const price = () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS price (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_id INT NOT NULL, 
        duration VARCHAR(50) NOT NULL,      
        price DECIMAL(10, 2) NOT NULL,
        type  ENUM('Hourly', 'Weekly', 'Month') ,        
        FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE  
      );
    `;

    connection.query(query);
    console.log(' Price table created successfully!');
  } catch (err) {
    console.error(' Error when create a table :', err.message);
  }
}
export default price
