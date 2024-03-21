const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/driver-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/driver/:driverId", DriverController.getDriverById);
router.get("/drivers", DriverController.getAllDriver);
router.post("/driver", DriverController.createDriver);
router.put("/driver", DriverController.updateDriver);
router.delete("/driver/:driverd", DriverController.deleteDriverById);
module.exports = router;
