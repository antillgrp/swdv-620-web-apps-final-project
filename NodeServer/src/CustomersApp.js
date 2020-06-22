/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const customersController = require("./CustomersController");

const app = express();

app.use(bodyParser.json());

customersController(app);

app.listen(
  (app.PORT = 4002),
  () => console.log(`Customer Rest API listening on port:`, app.PORT)
  // https://www.kevinsimper.dk/posts/how-to-get-the-port-of-express.js-app-devtip
);
