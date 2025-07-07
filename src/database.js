import { createConnection } from 'mysql';
import "dotenv/config"

console.log("hi", process.env.USER_NAME
, process.env.PASSWORD, process.env.DB_NAME)

var connection = createConnection({
  host:  process.env.LOCALHOST,
  user:  process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
});

//connection.end();
export default connection;


