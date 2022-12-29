import jwt from "jsonwebtoken"

const genJWT =()=>{
    return jwt.sign({nombre:'andy'}, process.env.JWT_SECRET,{
            expiresIn:"30d"
        },
    )
}

export default genJWT