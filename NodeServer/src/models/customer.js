// sequelize-auto -o "./models" -d CustomersDB -h 172.17.0.2 -u root -p 3306 -x mypassword -e mysql

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // https://stackoverflow.com/a/47037717
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "customer",
    }
  );
};
