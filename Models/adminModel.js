import mongoose, { Model, model } from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true},
    details: { type: String, unique: true, trim: true},
    list: { type: String, unique: true, trim: true}
})

const admins = model("admins",adminSchema)

export default admins