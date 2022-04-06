const { Schema, model } = require("mongoose");

const teacherSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  }
);

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;