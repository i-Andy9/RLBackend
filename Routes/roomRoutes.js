import Express from "express";
import {
  addRooms,
  deleteRoom,
  editRoom,
  getRoom,
  getRooms,
  getpagerooms,
} from "../Controllers/roomsController.js";

const roomRoutes = Express.Router();

roomRoutes
    .route("/test")
    .get(getpagerooms);

roomRoutes
    .route("/")
    .get(getRooms)
    .post(addRooms);

roomRoutes
    .route("/:code")
    .get(getRoom)
    .put(editRoom)
    .delete(deleteRoom);

export default roomRoutes;
