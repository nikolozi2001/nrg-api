const { sql, poolPromise } = require("../db");

const getRecordByChart_id = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("chart_id", sql.Int, id)
      .query(
        "SELECT legend_code, total, city, village FROM Households_code WHERE chart_id = @chart_id"
      );
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRecordByChart_id,
};
