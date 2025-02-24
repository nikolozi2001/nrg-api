const sql = require("mssql");

const config = {
user: "nrgPortalApiUser",
password: "getMYdataN0W",
server: "192.168.0.220",
database: "NRG",
options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
},
connectionTimeout: 30000,
requestTimeout: 30000
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
