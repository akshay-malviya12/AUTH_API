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

// createTable.js
// import connection from '../database.js';

// const auth = () => {
//   try {
//     // Step 1: Create table
//     const query = `
//       CREATE TABLE IF NOT EXISTS auth (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) UNIQUE,
//         password VARCHAR(100) NOT NULL,
//         token VARCHAR(250) NOT NULL DEFAULT 'tokenvalues',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `;

//     connection.query(query, (err) => {
//       if (err) {
//         console.error("Error creating auth table:", err.message);
//         return;
//       }
//       console.log("✅ Auth table created successfully!");

//       // Step 2: Insert default user
//       const insert = `
//         INSERT INTO auth (name, email, password,token)
//         SELECT * FROM (SELECT 'Admin', 'admin@example.com','$2a$12$MzBACB1MZBRSFJqUxzBjs.kjdyCLxwj.h3SKUmG/pG3VdnubQbOTS',"jfdfdid") AS tmp
//         WHERE NOT EXISTS (
//           SELECT email FROM auth WHERE email = 'admin@example.com'
//         ) LIMIT 1;
//       `;

//       connection.query(insert, (err2) => {
//         if (err2) {
//           console.error("❌ Failed to insert default user:", err2.message);
//         } else {
//           console.log("✅ Default admin user inserted (if not exists).");
//         }
//       });
//     });
//   } catch (err) {
//     console.error("❌ Table creation error:", err.message);
//   }
// };

// export default auth;

