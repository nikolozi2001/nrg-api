const { sql, poolPromise } = require("../db");
const logger = require("../logger");

// Get all coal supply consumption data in tons for a specific year
const getCoalSupplyTonsByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, year
                  FROM vw_coalSupplyConsumptionTons 
                  WHERE year = @year`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getCoalSupplyTonsByYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get coal supply consumption data in tons for a specific code and year
const getCoalSupplyTonsByCodeAndYear = async (req, res) => {
  const { code, year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, year
                  FROM vw_coalSupplyConsumptionTons 
                  WHERE code = @code AND year = @year`;
    const result = await pool
      .request()
      .input("code", sql.VarChar, code)
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getCoalSupplyTonsByCodeAndYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCoalSupplyTonsByYear,
  getCoalSupplyTonsByCodeAndYear
};