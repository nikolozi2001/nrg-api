const { sql, poolPromise } = require("../db");

const getMainNrgIndicatorsByChartid = async (req, res) => {
  const { chartid } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM main_nrg_indicators WHERE chart_id = @chartid`;
    const result = await pool
      .request()
      .input("chartid", sql.Int, chartid)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getMainNrgIndicatorsByChartid,
};
