/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const customersController = require("./CustomersController");

const app = express();
app.use(bodyParser.json());

customersController(app);

let server = app.listen((app.PORT = 4000), () => {
  console.log(`Customer Rest API listening on port:`, app.PORT);
  //app.PORT = `${server.address().port}`.trim();
});
