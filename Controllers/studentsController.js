import Students from "../Models/studentsModel.js";

const getPage =(req,res)=>{
    
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
        res.send({ msg: `${error.message}` });
    }
}
const getStudents = async (req,res)=>{
     try {
        
        const listStudents = await Students.find().select('-_id,-__v')

        return res.status(200).json({
            msg:'Lista de estudiantes registrados',
            listStudents,
        })

     } catch (error) {
        res.send({ msg: `${error.message}` });
     }
}
const getStudent = async (req,res)=>{
    try {
    
        const { rut } = req.params;
        
        if ([null, undefined].includes(rut) || rut.length < 7) {
        res.status(400).json({
            msg: "Sintaxis no valida",
            status: "bad request",
        });
        }

        //prevent duplicate students
        
        const studentsExist = await Students.findOne({ rut }).select("-_id -__v");
        
        if(!studentsExist) {
            const error = new Error ("El rut ingresado no se ecnuentra registrado")

            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json({
            msg: "Estudiante encontrado correctamente",
            studentsExist,
        });

    } catch (error) {
        res.send({ msg: `${error.message}` });
    }
}
const editStudent = async (req,res)=>{
    try {
        const { rut } = req.params
        const {name,lastName,age,classroom,gender,family,} = req.body

        if ([null, undefined].includes(rut) || rut.length <7 ) {
        
        res.status(400).json({ 
            msg: "Sintaxis no valida", 
            status: "bad request" });
            return
        }
 
        const studentsExist = await Students.findOne({ rut }) 

        if(!studentsExist){
            res.status(404).json({
                msg:` Error, no se han encontrado usuarios con este rut,${rut}`
            })
            return
        }

        studentsExist.name = name || studentsExist.name
        studentsExist.lastName = lastName || studentsExist.lastName
        studentsExist.age = age || studentsExist.age
        studentsExist.classroom = classroom ||studentsExist.classroom
        studentsExist.gender = gender ||studentsExist.gender
        studentsExist.family = family || studentsExist.family

        const studentUpadeted= await studentsExist.save()

        res.status(200).json({
            msg:`Se ha editado correctamente el registro del estudiante con rut ${rut}`,
            studentUpadeted
        })
        
    } catch (error) {
        res.send({ msg: `${error.message}` });
    }
}
const deleteStudent =async (req, res) => {
    try {
        const { rut } = req.params 

        if ([null, undefined].includes(rut) || rut.length <7 ) {
        
        res.status(400).json({ 
            msg: "Sintaxis no valida", 
            status: "bad request" });
            return
        }

        const studentsExist = await Students.findOne({ rut })

        if(!studentsExist){
            res.status(404).json({
                msg:` Error, no se han encontrado usuarios con este rut,${rut}`
            })
            return
        }

        await Students.findByIdAndDelete(studentsExist._id)

        return res.status(200).json({ 
            msg: `Se ha eliminado correctamente el registro con rut ${rut}`,
        })
        
    } catch (error) {
        res.send({ msg: `${error.message}` });
        
    }
} 

export {
    getPage,
    getStudents,
addStudents,
getStudent,
editStudent,
deleteStudent,
}