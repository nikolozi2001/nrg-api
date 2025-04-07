const { sql, poolPromise } = require("../db");
const logger = require("../logger");

const getCoalSupplyTonsOfOilByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, total, year
                  FROM vw_coalSupplyConsumptionTonsOfOil 
                  WHERE year = @year`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getCoalSupplyTonsOfOilByYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getCoalSupplyTonsOfOilByCodeAndYear = async (req, res) => {
  const { code, year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT code, name_ge, name_en, anthracite, otherBituminous, 
                  localCoal, furnaceCoke, total, year
                  FROM vw_coalSupplyConsumptionTonsOfOil 
                  WHERE code = @code AND year = @year`;
    const result = await pool
      .request()
      .input("code", sql.Int, code)
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(
      `Error in getCoalSupplyTonsOfOilByCodeAndYear: ${err.message}`
    );
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCoalSupplyTonsOfOilByYear,
  getCoalSupplyTonsOfOilByCodeAndYear,
};
