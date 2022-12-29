import mongoose, { Model, model } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true},
    lastName: { type: String, unique: true, trim: true},
    rut: { type: String, unique: true, trim: true}, 
    age: { type: Number, unique: true, trim: true},
    classroom: { type: String, unique: true, trim: true},
    gender: { type: String, unique: true, trim: true},
    family: { type: String, unique: true, trim: true}, 
})

const Students = model("Students",studentSchema)

export default Students