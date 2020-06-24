/*jshint esversion: 6 */

const customers = require("./CustomersRepository");

const { exec } = require("child_process");
const { inspect } = require("util");

let ExpVer = "";

exec(
  "npm view express version",
  (_, stdout) => (ExpVer = stdout ? stdout : "unknown")
);

// safely handles circular references
JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};

/**
 * Routing refers to determining how an application responds
 * to a client request for a specific endpoint, which is a URI
 * (or path) and a specific HTTP request method
 * (GET, POST, PUT, PATCH, DELETE)
 */

module.exports = (app) => {
  // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X GET "http://localhost:4000/"
  app.get("/", (req, res) => {
    res.send(
      `Express server ver(${ExpVer.trim()}) running on port: ${app.PORT}\n`
    );
  });

  app
    .route("/customers")
    .get(
      (req, res, next) => {
        //middleware
        console.log(
          "Requested from: " /* + JSON.safeStringify(req)*/ + req.originalUrl
        );
        console.log(
          "Requested type: " /* + JSON.safeStringify(req)*/ + req.method
        );
        //console.log("Requested:" + util.inspect(req));
        next();
      },
      (req, res) => {
        /*****GETALL****/ // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X GET "http://localhost:4000/customers"

        //res.send("GET request for /customers successful!\n");
        //customers.findAll(req, res);
        customers.findAllEven(req, res);
      }
    )
    .post((req, res) => {
      /******CREATE********/ // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data '{"id":2024,"email":"jhami6dddff54lton0@a.gov","first_name":"Joshua","last_name":"Hamilton","ip":"135.75.95.238","latitude":-27.634171,"longitude":-52.273891,"created_at":"2015-01-21 03:20:11","updated_at":null}' "http://localhost:4000/customers"

      //res.send("POST request for [/customers] successful!\n");
      customers.create(req, res);
    })
    .put((req, res) => {
      /******UPDATE*********/ // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X PUT --data '{"id":2024,"email":"jhami6dddff54lton0@a.gov","first_name":"Joshua","last_name":"Hiram","ip":"135.75.95.238","latitude":-27.634171,"longitude":-52.273891,"created_at":"2015-01-21 03:20:11","updated_at":null}' "http://localhost:4000/customers"

      //res.send("PUT request for [/customers] successful!\n");
      customers.update(req, res);
    });

  app
    .route("/customers/:custID")
    .get((req, res) => {
      /*****GETONEBYID******/ // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X GET "http://localhost:4000/customers/68"

      //res.send("GET request for [/customers/:custID] successful!\n");
      customers.findById(req, res);
    })
    /*******DELETE***********/

    .delete((req, res) => {
      /*******DELETE***********/ // curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X DELETE "http://localhost:4000/customers/68"

      //res.send("DELETE request for [/customers/:custID] successful!\n");
      customers.delete(req, res);
    });
};
