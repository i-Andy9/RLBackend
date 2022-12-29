import Students from "../Models/studentsModel.js";

const getPage =(req,res)=>{
    console.log("hola"); 
    res.json({msg:'aaa',code:400})
} 
const addStudents = async (req,res)=>{ 
    try {
        
    if (
        Object.keys(req.body).length === 0 ||
        req.body === undefined ||
        req.body === null
        ) {
        res.json({
            msg: `No hay informacion`,
            code: 204,
        });
        return;
        }
        if (Object.keys(req.body).length < 6) {
        res.json({
            msg: `Falta informacion`,
            code: 206,
        });
        return;
        }
        
        const {name,lastName,rut,age,classroom,gender,family,} = req.body

        //prevent duplicate students
        const studentsExist = await Students.findOne({ rut });

        if (studentsExist) {
        const error = new Error("usuario ya esta registrado");

        return res.status(400).json({ msg: error.message });
        }

        const Student = new Students(req.body);
        const studentsSave = await Student.save();

        return res.json({
        msg: "Estudiante agregada correctamente",
        code: 201,
        status: "creado",
        students: studentsSave,
        });
    } catch (error) {
        throw(error)
    }
}
const getStudents =()=>{
    console.log("hola"); 
}
const getStudent =()=>{
    console.log("hola"); 
}
const editStudent =()=>{
    console.log("hola"); 
}
const deleteStudent =()=>{
    console.log("hola"); 
} 

export {
    getPage,
    getStudents,
addStudents,
getStudent,
editStudent,
deleteStudent,
}