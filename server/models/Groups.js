const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Group = mongoose.model("groups", GroupsSchema);
