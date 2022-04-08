const { Schema, model } = require("mongoose");

const teacherAdSchema = new Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

  }
);

const TeacherAd = model("TeacherAd", teacherAdSchema);

module.exports = TeacherAd;