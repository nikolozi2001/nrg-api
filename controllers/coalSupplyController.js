const { sql, poolPromise } = require("../db");
const logger = require("../logger");

// Get all coal supply consumption data for a specific year
const getCoalSupplyByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, total, year
                  FROM vw_coalSupplyConsumptionTerajoule 
                  WHERE year = @year`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getCoalSupplyByYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get coal supply consumption data for a specific code and year
const getCoalSupplyByCodeAndYear = async (req, res) => {
  const { code, year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, total, year
                  FROM vw_coalSupplyConsumptionTerajoule 
                  WHERE code = @code AND year = @year`;
    const result = await pool
      .request()
      .input("code", sql.VarChar, code)
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getCoalSupplyByCodeAndYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCoalSupplyByYear,
  getCoalSupplyByCodeAndYear
};