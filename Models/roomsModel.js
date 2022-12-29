import mongoose, { Model, model } from "mongoose";

const roomSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true},
    details: { type: String, unique: true, trim: true},
    list: { type: String, unique: true, trim: true}
})

const rooms = model("rooms",roomSchema)

export default rooms