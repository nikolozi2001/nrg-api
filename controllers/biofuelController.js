const { sql, poolPromise } = require("../db");

const getBiofuelByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_biofuel_unit WHERE code = @code`;
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

const getAllBiofuels = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_biofuel_unit WHERE year = @year`;
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

const getBiofuelsByYearAndSubCode = async (req, res) => {
  const { year, sub_code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM vw_biofuel_unit WHERE year = @year AND sub_code = @sub_code`;
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
    getBiofuelByCode,
    getAllBiofuels,
    getBiofuelsByYearAndSubCode,
};
