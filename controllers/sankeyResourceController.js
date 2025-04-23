const { sql, poolPromise } = require("../db");

const getSankeyByChartId = async (req, res) => {
  const { chart_id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM Sankey_resource_code WHERE chart_id = @chart_id`;
    const result = await pool
      .request()
      .input("chart_id", sql.Int, chart_id)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllSankeys = async (req, res) => {
  const { year } = req.params;
  try {
    const pool = await poolPromise;
    const yearColumn = `y_${year}`;
    const query = `SELECT column_name, chart_id, legend_code, ${yearColumn} AS value FROM Sankey_resource_code WHERE ${yearColumn} IS NOT NULL`;
    const result = await pool
      .request()
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getSankeysByYearAndChartId = async (req, res) => {
  const { year, chart_id } = req.params;
  try {
    const pool = await poolPromise;
    const yearColumn = `y_${year}`;
    const query = `SELECT column_name, chart_id, legend_code, ${yearColumn} AS value FROM Sankey_resource_code WHERE ${yearColumn} IS NOT NULL AND chart_id = @chart_id`;
    const result = await pool
      .request()
      .input("chart_id", sql.Int, chart_id)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getSankeyByChartId,
    getAllSankeys,
    getSankeysByYearAndChartId,
};
