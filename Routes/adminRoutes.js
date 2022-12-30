import express from "express";
import {addAdmin,
    deleteAdmin,
    signInAdmin,
    getAdmins,
    test,
    loadOutAdmin
} from "../Controllers/adminController.js"
import { checkAuth } from "../Middleware/authSesion.js";

const adminRoutes = express.Router()

adminRoutes
    .route("/test")
    .get(test);

adminRoutes
    .route("/")
    .get(getAdmins)
    .post(addAdmin)
    .delete(deleteAdmin);
adminRoutes
    .route("/login")
    .post(checkAuth,signInAdmin)
adminRoutes
    .route("/loadout")
    .post(checkAuth,loadOutAdmin)

export default adminRoutes