const mongoose = require("mongoose");

const DatabaseSchema = mongoose.Schema(
  {
    email: { type: String },
    TodoTitle: { type: String },
    TodoDescription: { type: String },
    TodoStatus: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const TodoModel = mongoose.model("Todo-lists", DatabaseSchema);
module.exports = TodoModel;
