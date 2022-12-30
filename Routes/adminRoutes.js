import express from "express";
import {addAdmin,
    deleteAdmin,
    signInAdmin,
    getAdmins,
    test,
    loadOutAdmin
} from "../Controllers/adminController.js"
import { checkAuth } from "../Middleware/authSesion.js";
import { CheckSesion } from "../Middleware/CheckSesion.js";

const adminRoutes = express.Router()

adminRoutes
    .route("/test")
    .get(test);

adminRoutes
    .route("/")
    .get(checkAuth,CheckSesion,getAdmins)
    .post(checkAuth,CheckSesion,addAdmin)
    .delete(checkAuth,CheckSesion,deleteAdmin);
adminRoutes
    .route("/login")
    .post(checkAuth,signInAdmin)
adminRoutes
    .route("/loadout")
    .post(checkAuth,loadOutAdmin)

export default adminRoutes