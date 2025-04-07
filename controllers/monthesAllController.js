const { sql, poolPromise } = require("../db");
const logger = require("../logger");

/**
 * Get all monthly data for a specific year
 * @param {object} req - Request object with year parameter
 * @param {object} res - Response object
 */
const getAllMonthsByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT name, chart_id, legend_code, year, 
                  Jan, Feb, Mar, Apr, May, Jun, 
                  Jul, Aug, Sep, Oct, Nov, Dec 
                  FROM monthes 
                  WHERE year = @year`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getAllMonthsByYear: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all monthly data for a specific year and chart_id
 * @param {object} req - Request object with year and chart_id parameters
 * @param {object} res - Response object
 */
const getMonthsByYearAndChartId = async (req, res) => {
  const { year, chart_id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT name, chart_id, legend_code, year, 
                  Jan, Feb, Mar, Apr, May, Jun, 
                  Jul, Aug, Sep, Oct, Nov, Dec 
                  FROM monthes 
                  WHERE year = @year AND chart_id = @chart_id`;
    const result = await pool
      .request()
      .input("year", sql.Int, year)
      .input("chart_id", sql.Int, chart_id)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getMonthsByYearAndChartId: ${err.message}`);
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMonthsByYear,
  getMonthsByYearAndChartId
};