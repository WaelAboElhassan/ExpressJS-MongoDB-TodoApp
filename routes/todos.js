import express from "express";
import {
  readTodos,
  createTodo,
  updateTodo,
  removeTodo,
} from "../controllers/todos.js";
const router = express.Router();

router.get(`/`, readTodos);

router.post(`/create-todo`, createTodo);

router.put(`/edit-todo`, updateTodo);

router.delete(`/remove-todo`, removeTodo);

export default router;
