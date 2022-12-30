import jwt from "jsonwebtoken";
import Admins from "../Models/adminModel.js";

export const checkAuth = async (req, res, next) => { 
  let token 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
   try {

        token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.admin = await Admins.findOne(decoded.JwtPayload).select('-_id -__v -password -token -jwt')
  

   } catch (error) {
        const e = new Error("Token no valido")
        res.status(403).json({msg: e.message});
   }


  }
  if(!token){
        const e = new Error("Token no valido o inexistente")
        res.status(403).json({msg: e.message});
  }

  next();
};
