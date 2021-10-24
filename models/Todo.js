import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Todo Title is required"],
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
