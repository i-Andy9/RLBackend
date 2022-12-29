import express from 'express'
import { getPage,
    getStudents,
addStudents,
getStudent,
editStudent,
deleteStudent, } from '../Controllers/studentsController.js';

const studentsRoutes = express.Router()

studentsRoutes
    .route("/test")
    .get(getPage)

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