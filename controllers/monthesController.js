const { sql, poolPromise } = require("../db");

const getMonthYears = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT CAST(REPLACE(TABLE_NAME, 'monthes', '') AS INT) AS year
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_NAME LIKE 'monthes[0-9]%'
      ORDER BY year
    `);

    res.json(result.recordset.map((r) => r.year));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getLastMonthYear = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT TOP 1 TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_NAME LIKE 'monthes[0-9]%'
      ORDER BY TABLE_NAME DESC
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "No monthes tables found" });
    }

    const year = result.recordset[0].TABLE_NAME.replace("monthes", "");
    res.json({ year });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

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
  getLastMonthYear,
  getMonthYears,
};
