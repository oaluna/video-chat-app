const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserMessagesSchema = new Schema(
  {
    message: { type: Schema.Types.ObjectId, ref: "messages", required: true },
    previous_message: { type: Schema.Types.ObjectId, ref: "messages" },
  },
  { timestamps: true }
);

module.exports = Group = mongoose.model("user_messages", UserMessagesSchema);
