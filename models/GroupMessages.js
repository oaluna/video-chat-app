const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
    message: {
      type: String,
      required: true,
    },
    sendername:{
      type:String,
      required:true
    },
    group: { type: Schema.Types.ObjectId, ref: "groups", required: true },
  },
  { timestamps: true }
);

module.exports = GroupMessages = mongoose.model("group_messages", GroupMessageSchema);
