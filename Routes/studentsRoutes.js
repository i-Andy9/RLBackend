import express from 'express'
import { getPageStudents,
    getStudents,
addStudents,
getStudent,
editStudent,
deleteStudent, } from '../Controllers/studentsController.js';

const studentsRoutes = express.Router()

studentsRoutes
    .route("/test")
    .get(getPageStudents)

studentsRoutes
    .route("/")
    .get(getStudents)
    .post(addStudents)

studentsRoutes
    .route("/:rut")
    .get(getStudent)
    .put(editStudent)
    .delete(deleteStudent)


    export default studentsRoutes;