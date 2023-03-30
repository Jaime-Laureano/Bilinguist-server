const { Schema, model } = require("mongoose");

const addTeacherSchema = new Schema({
	fullName: { type: String, required: true },
	languages: { type: String, required: true },
	cityRec: { type: String, required: true },
	price: { type: Number, required: true },
	langLevel: { type: String, required: true },
	goals: { type: String, required: true },
	funFact: { type: String, required: true },
	city: { type: String, required: true },
});

const AddTeacher = model("AddTeacher", addTeacherSchema);

module.exports = AddTeacher;
