const { sql, poolPromise } = require("../db");

const getMonthByChart_id = async (req, res) => {
  const { year, chart_id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM monthes${year} WHERE chart_id = @chart_id`;
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
  getMonthByChart_id,
};
