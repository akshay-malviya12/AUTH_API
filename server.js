import express from "express";
import bodyParser from "body-parser";
import router from "./src/router.js";
import auth from './src/tables/authTable.js';
import categoryTable from './src/tables/categoryTable.js';
import serviceTable from './src/tables/serviceTable.js';
import priceTable from './src/tables/priceTable.js'
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})
//table create function calling..
 auth();
 categoryTable();
 serviceTable();
 priceTable();

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  
});



