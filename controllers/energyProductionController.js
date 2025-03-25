const { sql, poolPromise } = require("../db");

const getenergyProduction = async (req, res) => {
  const { legend_code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM energyProduction 
                  WHERE legend_code = @legend_code`;
    const result = await pool
      .request()
      .input("legend_code", sql.VarChar, legend_code)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getenergyProduction,
};
