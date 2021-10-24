import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const isValidObjectId = mongoose.isValidObjectId;
export const readTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ data: todos, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    return res.status(200).json({ data: todo, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo_id = req.body.todo_id;
    if (!isValidObjectId(todo_id)) {
      return res.status(400).json({
        error: `Requested todo ID <${todo_id}> is not valid`,
        message: `Invalid Todo ID`,
        success: false,
      });
    }
    const todo = await Todo.findByIdAndUpdate(
      { _id: todo_id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (todo) {
      return res.status(201).json({
        data: todo,
        message: `Selected item updated successfully`,
        success: true,
      });
    }
    return res.status(404).json({
      error: `Item not found `,
      message: `Item not found`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

export const removeTodo = async (req, res) => {
  try {
    const todo_id = req.body.todo_id;
    if (!isValidObjectId(todo_id) || !todo_id) {
      return res.status(400).json({
        error: `Requested todo ID <${todo_id}> is not valid`,
        message: `Invalid Todo ID`,
        success: false,
      });
    }
    const todo = await Todo.findByIdAndDelete(todo_id);
    if (todo) {
      return res.status(201).json({
        data: todo,
        message: `Selected item removed successfully`,
        success: true,
      });
    }
    return res.status(404).json({
      error: `Item not found or already removed`,
      message: `Item not found`,
      success: false,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
