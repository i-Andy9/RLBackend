import Rooms from "../Models/roomsModel.js";

const getpagerooms =(req,res)=>{
    console.log("holaa");
    return res.json({ msg:'hola funciona'})
}
const addRooms = async (req,res)=>{
    try {
        if (
            Object.keys(req.body).length === 0 ||
            req.body === undefined ||
            req.body === null
            ) {
            return res.json({
                msg: `No hay informacion`,
                code: 204,
            }); 
        }
        if (Object.keys(req.body).length < 4) {
            res.json({
                msg: `Falta informacion`,
                code: 206,
            });
            return;
        }
        
        const {code,name,details,list} = req.body
        
        //prevent duplicate
        const roomExists = await Rooms.findOne({code})
        
        if(roomExists) {
            const error = new Error("Aula ya registrada")
            
            return res.status(400).json({msg:error.message})
        }
        
        const Room = new Rooms(req.body)
        const roomSave = await Room.save()
        
        return res.status(201).json({
            msg: "Aula registrada correctamente",
            code: 201,
            status: "creado",
            Aula:  {
                "code": roomSave.code,
                "name": roomSave.name,
                "details": roomSave.details,
                "list": roomSave.list,
            },
        })
        
    } catch (error) {
        res.send({msg: `${error.message}`})
    } 
    
    
}
const getRooms = async (req,res)=>{
    try {
            const listRooms = await Rooms.find().select('-_id -__v')

            return res.status(200).json({
                msg:"Lista de aulas registradas",
                listRooms,
            })
    } catch (error) {
        res.json({msg: error.message})
    }
}
const getRoom = async (req,res)=>{
    try {
        const {code} = req.params //

        if ([null, undefined].includes(code) || code.length != 3) {
            res.status(400).json({
                msg: "Sintaxis no valida",
                status: "bad request",
            });
        }

        const roomExist = await Rooms.findOne({code}).select('-_id -__v')

        if(!roomExist){
            const error = new Error ('El codido de aula ingresado no esta registrado')

            return res.status(404).json({msg: error.message})
        }

        return res.status(200).json({
            msg:'Aula encontrada correctamente',
            roomExist,
        })
    } catch (error) {
        res.send({msg: error.message})
    }
}
const editRoom =async (req,res)=>{
     try {
        
        const {code} = req.params 
        const {name,detail,list} = req.body

        if ([null, undefined].includes(code) || code.length != 3) {
        
            return res.status(400).json({ 
                msg: "Sintaxis no valida", 
                status: "bad request" });

        }

        const roomExist = await Rooms.findOne({code})

        if(!roomExist){
            return res.status(404).json({msg: `Error, no se ha encontrado
             regstros de la aula con codigo ${code}`})
        }

        roomExist.name= name || roomExist.name 
        roomExist.detail= detail || roomExist.detail 
        roomExist.list= list || roomExist.list 

        var roomUpdated = await roomExist.save()

        delete roomUpdated._id
        delete roomUpdated.__v 

        return res.status(200).json({
            msg:`Se ha editado el registro del aula con codigo ${code}`,
            roomUpdated,
        })
     } catch (error) {
        res.send({msg: error.message})
     }
}
const deleteRoom = async (req,res)=>{
    try {
        const { code } = req.params 

        if ([null, undefined].includes(code) || code.length != 3 ) {
        
        res.status(400).json({ 
            msg: "Sintaxis no valida", 
            status: "bad request" });
            return
        }

        const roomExist = await Rooms.findOne({ code })

        if(!roomExist){
            return res.status(404).json({
                msg:` Error, no se han encontrado aulas con el codigo ${code}`
            }) 
        }

        await Rooms.findByIdAndDelete(roomExist._id)

        return res.status(200).json({ 
            msg: `Se ha eliminado correctamente el registro con codigo ${code}`,
        })
    } catch (error) {
        res.send({ msg: `${error.message}` });
    }
}



export {
    getpagerooms,
    getRooms,
    addRooms,
    getRoom,
    editRoom,
    deleteRoom,
}