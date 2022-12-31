import mongoose, { Model, model } from "mongoose";

const adminSchema = new mongoose.Schema({
    mail: { type: String, unique: true, trim: true},
    password: { type: String,  trim: true},
    jwt: { type: String,   trim: true},
    actsesion:{ type: Boolean,  default: false },
})

const Admins = model("Admins",adminSchema)

export default Admins