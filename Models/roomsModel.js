import mongoose, { Model, model } from "mongoose";

const roomSchema = new mongoose.Schema({
    code: { type: String, unique: true, trim: true},
    name: { type: String,  trim: true},
    details: { type: String,  trim: true},
    list: { type: String, trim: true}
})

const Rooms = model("Rooms",roomSchema)

export default Rooms