<!-- create tables -->
<!-- AUth table -->
CREATE TABLE IF NOT EXISTS auth (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE,
        password varchar(100) NOT NULL,
        token varchar(100) NOT NULL DEFAULT 'tokenvalues',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

  <!-- Insert Data in Auth table  for login -->
  
 `INSERT INTO price (name, email, password,token) VALUES ("name","Please write the email ID mentioned in the task email" , "bcryt password ", "token value upadte when your login so not change ")`,
 
 
 <!-- Category Table -->
 CREATE TABLE IF NOT EXISTS category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL      
      );

 <!-- Service table -->
   CREATE TABLE IF NOT EXISTS service (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_name VARCHAR(100) NOT NULL, 
        category_id INT NOT NULL,      
        type  ENUM('Normal', 'VIP') DEFAULT 'Normal',
        price ENUM('Hourly', 'Weekly', 'Month') ,  
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE  
      );

<!-- price Tbale  -->

CREATE TABLE IF NOT EXISTS price (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_id INT NOT NULL, 
        duration VARCHAR(50) NOT NULL,      
        price DECIMAL(10, 2) NOT NULL,
        type  ENUM('Hourly', 'Weekly', 'Month') ,        
        FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE  
      );

    
