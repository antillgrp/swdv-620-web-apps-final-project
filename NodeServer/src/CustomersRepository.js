/*jshint esversion: 6 */

const Sequelize = require("sequelize");

const sequelizeConn = new Sequelize("CustomersDB", "root", "mypassword", {
  host: "localhost",
  port: "3406",
  dialect: "mysql",
  //operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});

{
  // Old Customer Model Def
  // const customerSchema = (sequelizeConnection) =>
  //   sequelizeConnection.define("customer", {
  //     id: {
  //       type: Sequelize.INTEGER,
  //       autoIncrement: true,
  //       primaryKey: true,
  //     },
  //     firstname: { type: Sequelize.STRING },
  //     lastname: { type: Sequelize.STRING },
  //     age: { type: Sequelize.INTEGER },
  //   });
}

const customerModel = require("./models/customer");

const customerTable = customerModel(sequelizeConn, Sequelize.DataTypes);

module.exports = {
  /*****GETALL****/
  findAll: (req, res) => {
    customerTable.findAll().then((custCollection) => {
      res.send(custCollection);
    });
  },
  /******CREATE********/
  create: (req, res) => {
    console.log("Creating:" + JSON.safeStringify(req.body));

    customerTable.create(req.body).then(
      (cust) =>
        res
          .status(require("http-status-codes").CREATED)
          .json(cust.dataValues.id),
      (_) =>
        res
          .status(require("http-status-codes").BAD_REQUEST)
          .json(`Customer with ID: ${req.body.id} already exists`)
    );
  },
  /******UPDATE*********/
  update: (req, res) => {
    console.log("Updating:" + JSON.safeStringify(req.body));

    //(GOOD) stackoverflow.com/a/8158485
    //(BEST) https://stackoverflow.com/a/26303473

    customerTable.update(req.body, { where: { id: req.body.id } }).then(
      ([affectedRows]) =>
        res
          .status(
            affectedRows > 0
              ? require("http-status-codes").CREATED
              : require("http-status-codes").NOT_MODIFIED
          )
          .json(affectedRows > 0 ? req.body.id : "NOT_MODIFIED"),
      (_) =>
        res
          .status(require("http-status-codes").BAD_REQUEST)
          .json(`Customer with ID: ${req.body.id} not found`)
    );
  },
  /*****GETONEBYID******/
  findById: (req, res) => {
    customerTable.findOne({ where: { id: req.params.custID } }).then(
      (custFound) =>
        res
          .status(
            custFound
              ? require("http-status-codes").OK
              : require("http-status-codes").NOT_FOUND
          )
          .json(custFound ? [custFound] : []),
      (_) =>
        res
          .status(require("http-status-codes").BAD_REQUEST)
          .json(`Customer with ID: ${req.params.custID} not found`)
    );
  },
  /*******DELETE***********/
  delete: (req, res) => {
    customerTable.destroy({ where: { id: req.params.custID } }).then(
      (custDeleted) =>
        res
          .status(
            custDeleted
              ? require("http-status-codes").OK
              : require("http-status-codes").NOT_FOUND
          )
          .end(custDeleted ? req.params.custID : undefined),
      (_) =>
        res
          .status(require("http-status-codes").BAD_REQUEST)
          .json(`Customer with ID: ${req.params.custID} not found`)
    );
  },
};
