const { sql, poolPromise } = require("../db");
const Joi = require("joi");
const logger = require("../logger"); // import logger

const recordSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required(),
});

const getAllRecords = async (req, res) => {
  try {
    logger.info("getAllRecords: Attempting to get all records");
    const pool = await poolPromise;
    logger.info("getAllRecords: Connected to the database");
    const result = await pool.request().query("SELECT * FROM codes");
    logger.info("getAllRecords: Query executed successfully");
    res.json(result.recordset);
  } catch (err) {
    logger.error(`Error in getAllRecords: ${err.message}`);
    logger.error(err); // log the full error object
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
    logger.error(`Error in getRecordById: ${err.message}`);
    logger.error(err); // log the full error object
    res.status(500).json({ error: err.message });
  }
};

const createRecord = async (req, res) => {
  const { name, value } = req.body;
  const { error } = recordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
    logger.error(`Error in createRecord: ${err.message}`);
    logger.error(err); // log the full error object
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
    logger.error(`Error in updateRecord: ${err.message}`);
    logger.error(err); // log the full error object
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
    logger.error(`Error in deleteRecord: ${err.message}`);
    logger.error(err); // log the full error object
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
