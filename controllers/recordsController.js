const { sql, poolPromise } = require("../db");

const getAllRecords = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM codes");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("code", sql.Int, id)
      .query("SELECT * FROM codes WHERE code = @code");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const createRecord = async (req, res) => {
  const { name, value } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("value", sql.NVarChar, value)
      .query(
        "INSERT INTO records (name, value) OUTPUT INSERTED.id VALUES (@name, @value)"
      );
    res.status(201).json({ id: result.recordset[0].id, name, value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("value", sql.NVarChar, value)
      .query("UPDATE records SET name = @name, value = @value WHERE id = @id");
    res.json({ id, name, value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM records WHERE id = @id");
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};
