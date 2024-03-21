const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/room/:roomId", RoomController.getRoomById);
router.get("/rooms", RoomController.getAllRoom);
router.post("/room", RoomController.createRoom);
router.put("/room", RoomController.updateRoom);
router.delete("/room/:roomId", RoomController.deleteRoomById);
module.exports = router;
