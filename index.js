import express from "express"
import dbConection from "./Config/dbConection.js";
import dotenv from "dotenv"
import cors from "cors" 
import genJWT from "./Helpers/JWT.js";
import studentsRoutes from "./Routes/studentsRoutes.js";
import roomRoutes from "./Routes/roomRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();
app.use(express.json())// acepta estructura json  
dotenv.config()// read .env  
dbConection()  
const PORT = process.env.PORT || 4000 // port of server or default

app.use("/rather/students/",studentsRoutes)
app.use("/rather/rooms",roomRoutes) 
app.use("/rather/admin",adminRoutes) 

app.listen(PORT, ()=>{ 
    console.log(`Server On, port ${PORT}`);
}) 