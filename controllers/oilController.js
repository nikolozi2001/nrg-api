const { sql, poolPromise } = require("../db");

const getOilByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_oil_and_oil_products WHERE code = @code`;
    const result = await pool
      .request()
      .input("code", sql.Int, code)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllOilsByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_oil_and_oil_products WHERE year = @year`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getOilByYearAndSubCode = async (req, res) => {
  const { year, sub_code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_oil_and_oil_products WHERE year = @year AND sub_code = @sub_code`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .input("sub_code", sql.NVarChar, sub_code)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getOilByCode,
    getAllOilsByYear,
    getOilByYearAndSubCode,
};
