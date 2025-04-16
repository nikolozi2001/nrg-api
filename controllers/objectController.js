const { sql, poolPromise } = require("../db");

const getObjByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM view_object_items WHERE code = @code`;
    const result = await pool
      .request()
      .input("code", sql.Int, code)
      .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllObjects = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM view_object_items`;
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

module.exports = {
    getObjByCode,
    getAllObjects,
};
