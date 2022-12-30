import express from 'express'
import { getPageStudents,
    getStudents,
addStudents,
getStudent,
editStudent,
deleteStudent, } from '../Controllers/studentsController.js';
import { checkAuth } from '../Middleware/authSesion.js';
import { CheckSesion } from '../Middleware/CheckSesion.js';

const studentsRoutes = express.Router()

studentsRoutes
    .route("/test")
    .get(getPageStudents)

studentsRoutes
    .route("/")
    .get(getStudents)
    .post(checkAuth,CheckSesion,addStudents)

studentsRoutes
    .route("/:rut")
    .get(getStudent)
    .put(checkAuth,CheckSesion,editStudent)
    .delete(checkAuth,CheckSesion,deleteStudent)


    export default studentsRoutes;