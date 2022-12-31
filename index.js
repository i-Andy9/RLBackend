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

const dominiopermitido = ['http://127.0.0.1:5173','http://localhost', 'https://abtfrontendaz.netlify.app/']
const corsOption = {
    origin : function(origin, callback) {
        if(dominiopermitido.indexOf(origin) !== -1) {
            callback(null,true)
        }else{
            callback(new Error('No permitido por COrs'))
        }
    }
}

app.use(cors(corsOption))

const PORT = process.env.PORT || 4000 // port of server or default

app.use("/rather/students/",studentsRoutes)
app.use("/rather/rooms",roomRoutes) 
app.use("/rather/admin",adminRoutes) 

app.listen(PORT, ()=>{ 
    console.log(`Server On, port ${PORT}`);
}) 