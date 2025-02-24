const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const recordsController = require("../controllers/recordsController");
const householdsController = require("../controllers/householdsController");
const monthesController = require("../controllers/monthesController");
const resourceController = require("../controllers/resourceController");

router.get("/", (req, res) => {
  const readmePath = path.join(__dirname, "../README.md");
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading README.md");
    } else {
      res.type("text/plain").send(data);
    }
  });
});

router.get("/records", recordsController.getAllRecords);
router.get("/records/:id", recordsController.getRecordById);
// router.post("/", recordsController.createRecord);
// router.put("/:id", recordsController.updateRecord);
// router.delete("/:id", recordsController.deleteRecord);

router.get("/households/:id", householdsController.getRecordByChart_id);
router.get("/monthes/:year/:chart_id", monthesController.getMonthByChart_id);
router.get(
  "/resource/:year/:chart_id",
  resourceController.getResourceByChart_id
);

module.exports = router;
