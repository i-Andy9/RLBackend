import genJWT from "../Helpers/JWT.js";
import Admins from "../Models/adminModel.js";

const addAdmin = async ( req,res)=>{
    try {
        
        if( 
            Object.keys(req.body).length === 0 ||
            req.body === undefined ||
            req.body === null
        ){
            return res.json({
                msg: `No hay informacion`,
                code: 204,
            }); 
        }
        
        if (Object.keys(req.body).length < 2) {
            return res.json({
                msg: `Falta informacion`,
                code: 206,
            }); 
        }

        const {mail,password,jwt,actsesion} = req.body;

        //prevent duplicate
        const adminExist = await Admins.findOne({mail})

        if(adminExist){
            const error = new Error("Admin ya esta registrado")
            return res.status(400).json({msg: error.message})
        }

        //add jwt 
        req.body.jwt= genJWT(mail) 

         const  admin = new Admins(req.body)
        const adminsave = await admin.save()

        delete adminsave._id
        delete adminsave.__v
        
        return res.status(201).json({
            msg:"Admin registrado correctamente",
            code:201,
            status:"creado",
            admin:adminsave
        })
        
        
    } catch (error) {
        res.send({msg:error.message})
    }
}
const deleteAdmin = async (req,res)=>{
    try {
        
        const { mail } = req.params 

        if ([null, undefined].includes(mail) || mail.length <7 ) {
        
            return res.status(400).json({ 
                msg: "Sintaxis no valida", 
                status: "bad request" 
            }); 
        }

        const adminExist = await Admins.findOne({mail})

        if(!adminExist){
            const error = new Error(`No se han encontrados usuarios con el mail ${mail} `)
            return res.status(400).json({msg: error.message})
        } 

        const {password,jwt,actsesion} = req.body;

        await Admins.findByIdAndDelete(adminExist._id)

        return res.status(200).json({ 
            msg: `Se ha eliminado correctamente el registro con codigo ${code}`,
        })
    } catch (error) {
        res.send({msg:error.message})
    }
}
const signInAdmin = async (req,res)=>{  
    const {mail,password } = req.body 
    const adminToUpdate = await Admins.findOne({mail}).select(' -__v  ')
     
    if(!adminToUpdate){
        const error = new Error(`No se han encontrados usuarios con el mail ${mail} `)
        return res.status(400).json({msg: error.message,code:'Mail no valido'})
    } 
     
    if(adminToUpdate.password !== password){
        const error = new Error(`Error de contraseña`)
        return res.status(400).json({msg: error.message,code:'Contraseña Incorrecta'})
    }

    adminToUpdate.actsesion= true

    const adminSave = await adminToUpdate.save() 

    return res.status(200).json({
        msg:`Se ha iniciado sesion correctamente`,
        adminSave:{
            mail: adminSave.mail,
            actSesion:adminSave.actsesion,
            token: adminSave.jwt
        }
    })
}
const loadOutAdmin = async (req,res)=>{  
    const {mail } = req.admin

    const adminToUpdate = await Admins.findOne({mail}).select(" -__v -password ")
     
    adminToUpdate.actsesion= false

    const adminSave = await adminToUpdate.save() 
 

    return res.status(200).json({
        msg:`Se ha cerrado sesion correctamente`,
        adminSave:{
            mail: adminSave.mail,
            actSesion:adminSave.actsesion
        }
    })
}
const getAdmins = async (req,res)=>{
     try {
        
        const adminList = await Admins.find().select('-_id -__v')

        return res.status(200).json({
            msg:'Lista de administradores registrados',
            adminList,
        })
        
     } catch (error) {
        res.send({ msg: `${error.message}` });
     }
}
const test = ()=>{
    console.log("test");
}

export{
    addAdmin,
    signInAdmin,
    deleteAdmin,
    getAdmins,
    loadOutAdmin,
    test
}