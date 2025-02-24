const { sql, poolPromise } = require("../db");

const getResourceByChart_id = async (req, res) => {
  const { year, chart_id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT y_${year} FROM resource WHERE chart_id = @chart_id`;
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
  getResourceByChart_id,
};
