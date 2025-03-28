const { sql, poolPromise } = require("../db");

const getIndicatorsByName = async (req, res) => {
  const { name } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM Indicators_with_codes WHERE name = @name`;
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getIndicatorsByName,
};
