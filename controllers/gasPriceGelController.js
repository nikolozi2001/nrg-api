const { sql, poolPromise } = require("../db");

const getGasPriceGelByHousehold = async (req, res) => {
  const { household } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM gas_price_gel WHERE household = @household`;
    const result = await pool
      .request()
      .input("household", sql.Int, household)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getGasPriceGelByHousehold,
};
