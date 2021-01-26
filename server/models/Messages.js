const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    // status: {
    //   type: Number,
    //   default: 0,
    // },
    username:{
      type:String,
      required:true
    }
    // sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
    // receiver: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = Messages = mongoose.model("messages", MessagesSchema);
