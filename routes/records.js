const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const recordsController = require("../controllers/recordsController");
const householdsController = require("../controllers/householdsController");
const monthesController = require("../controllers/monthesController");
const resourceController = require("../controllers/resourceController");
const households_with_codesController = require("../controllers/households_with_codesController");
const resource_with_codesController = require("../controllers/resource_with_codesController");
const energyConsumptionController = require("../controllers/energyConsumptionController");
const energyConsumptionBySectorController = require("../controllers/energyConsumptionBySectorController");
const energyProductionController = require("../controllers/energyProductionController");
const indicatorsController = require("../controllers/indicatorsController");
const coalSupplyController = require("../controllers/coalSupplyController");
const coalSupplyTonsController = require("../controllers/coalSupplyTonsController");
const coalSupplyTonsOfOilController = require("../controllers/coalSupplyTonsOfOilController");
const monthesAllController = require("../controllers/monthesAllController");
const mainNrgIndicatorsController = require("../controllers/mainNrgIndicatorsController");
const gasPriceGelController = require("../controllers/gasPriceGelController");
const electricityPriceGelController = require("../controllers/electricityPriceGelController");
const objectController = require("../controllers/objectController");
const biofuelController = require("../controllers/biofuelController");
const sankeyResourceController = require("../controllers/sankeyResourceController");
const oilController = require("../controllers/oilController");
const electrycityHeatController = require("../controllers/electrycityHeatController");

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
router.get(
  "/householdswithcodes/:id",
  households_with_codesController.getHouseholds_with_codesByChart_id
);
router.get(
  "/resourceswithcodes/:id",
  resource_with_codesController.getResources_with_codesByChart_id
);
router.get(
  "/energyConsumption/:legend_code",
  energyConsumptionController.getEnergyConsumptionByLegendCode
);
router.get(
  "/energyConsumptionBySector/:legend_code",
  energyConsumptionBySectorController.getEnergyConsumptionBySector
);
router.get(
  "/energyProduction/:legend_code",
  energyProductionController.getenergyProduction
);
router.get("/indicators/:name", indicatorsController.getIndicatorsByName);
router.get("/coalSupply/year/:year", coalSupplyController.getCoalSupplyByYear);
router.get(
  "/coalSupply/code/:code/year/:year",
  coalSupplyController.getCoalSupplyByCodeAndYear
);
router.get(
  "/coalSupplyTons/year/:year",
  coalSupplyTonsController.getCoalSupplyTonsByYear
);
router.get(
  "/coalSupplyTons/code/:code/year/:year",
  coalSupplyTonsController.getCoalSupplyTonsByCodeAndYear
);
router.get(
  "/coalSupplyTonsOfOil/year/:year",
  coalSupplyTonsOfOilController.getCoalSupplyTonsOfOilByYear
);
router.get(
  "/coalSupplyTonsOfOil/code/:code/year/:year",
  coalSupplyTonsOfOilController.getCoalSupplyTonsOfOilByCodeAndYear
);
router.get("/monthesAll/year/:year", monthesAllController.getAllMonthsByYear);
router.get(
  "/monthesAll/year/:year/chart/:chart_id",
  monthesAllController.getMonthsByYearAndChartId
);
router.get(
  "/mainNrgIndicators/:chartid",
  mainNrgIndicatorsController.getMainNrgIndicatorsByChartid
);
router.get(
  "/gasPriceGel/:household",
  gasPriceGelController.getGasPriceGelByHousehold
);
router.get(
  "/electricityPriceGel/:household",
  electricityPriceGelController.getelectricityPriceGelbyHousehold
);
router.get("/objects/:code", objectController.getObjByCode);
router.get("/objects/year/:year", objectController.getAllObjects);
router.get(
  "/objects/year/:year/sub_code/:sub_code",
  objectController.getObjectsByYearAndSubCode
);

router.get("/biofuel/:code", biofuelController.getBiofuelByCode);
router.get("/biofuel/year/:year", biofuelController.getAllBiofuels);
router.get(
  "/biofuel/year/:year/sub_code/:sub_code",
  biofuelController.getBiofuelsByYearAndSubCode
);

router.get("/sankey/chart_id/:chart_id", sankeyResourceController.getSankeyByChartId);
router.get("/sankey/year/:year", sankeyResourceController.getAllSankeys);
router.get(
  "/sankey/year/:year/chart_id/:chart_id",
  sankeyResourceController.getSankeysByYearAndChartId
);

router.get("/oil/:code", oilController.getOilByCode);
router.get("/oil/year/:year", oilController.getAllOilsByYear);
router.get("/oil/year/:year/sub_code/:sub_code", oilController.getOilByYearAndSubCode);

router.get("/electricityHeat/:code", electrycityHeatController.getElectricityByCode);
router.get("/electricityHeat/year/:year", electrycityHeatController.getAllElectricityByYear);
router.get(
  "/electricityHeat/year/:year/sub_code/:sub_code",
  electrycityHeatController.getElectricityByYearAndSubCode
);

module.exports = router;
