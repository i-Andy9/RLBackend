import Express from "express";
import {
  addRooms,
  deleteRoom,
  editRoom,
  getRoom,
  getRooms,
  getpagerooms,
} from "../Controllers/roomsController.js";
import { checkAuth } from "../Middleware/authSesion.js";
import { CheckSesion } from "../Middleware/CheckSesion.js";

const roomRoutes = Express.Router();

roomRoutes
    .route("/test")
    .get(getpagerooms);

roomRoutes
    .route("/")
    .get(getRooms)
    .post(checkAuth,CheckSesion,addRooms);

roomRoutes
    .route("/:code")
    .get(getRoom)
    .put(checkAuth,CheckSesion,editRoom)
    .delete(checkAuth,CheckSesion,deleteRoom);

export default roomRoutes;
