import { Router } from "express";
import ToDoController from "../app/controller/ToDoController.js";

const router = Router();

router.get("/todos", ToDoController.getAllTodos);
router.post("/todos/", ToDoController.createTodo);
router.get("/todos/:id", ToDoController.getTodoById);
router.put("/todos/:id", ToDoController.updateTodoById);
router.delete("/todos/:id", ToDoController.deleteTodoById);
router.patch("/todos/:id/status/:status", ToDoController.updateTodoStatusById);

export default router;
