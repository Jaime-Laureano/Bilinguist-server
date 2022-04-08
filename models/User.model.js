const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    country: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },
    
    isTeacher: Boolean
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
