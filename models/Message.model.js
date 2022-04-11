const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
	{
		comment: { type: String, required: true },
		from: { type: String, required: true },
		// to: { type: Schema.Types.ObjectId, ref: "User", required: true }
	},
	{ timestamps: true },
);

const Message = model("Message", messageSchema);

module.exports = Message;
