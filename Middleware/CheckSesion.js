export const CheckSesion =(req,res,next)=>{
    console.log(req.admin);
     
    if(!req.admin.actsesion)
        return res.status(401).json({msg: "Sesion no inicializada"});

    
    next()
}