const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupsSchema = new Schema(
  {
    members: {
      type: Array,
      default: [],
    },
    admins: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = Group = mongoose.model("groups", GroupsSchema);
