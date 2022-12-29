import mongoose, { Model, model } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String,  trim: true},
    lastName: { type: String,  trim: true},
    rut: { type: String, unique: true, trim: true}, 
    age: { type: Number,  trim: true},
    classroom: { type: String,  trim: true},
    gender: { type: String,  trim: true},
    family: { type: String,  trim: true}, 
})

const Students = model("Students",studentSchema)

export default Students