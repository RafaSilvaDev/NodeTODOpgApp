import ToDoRepository from "../repositories/ToDoRepository.js";
import Constants from "../util/Constants.js";

class ToDoController {
  async getAllTodos(req, res) {
    try {
      const result = await ToDoRepository.findAll();
      if (result.length) res.status(200).json(result);
      else res.status(404).json({ message: Constants.NO_TODOS_FOUND() });
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }

  async getTodoById(req, res) {
    try {
      const result = await ToDoRepository.findById(req.params.id);
      if (result.length) res.status(200).json(result[0]);
      else res.status(404).json({ message: Constants.TODO_NOT_FOUND() });
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }

  async createTodo(req, res) {
    try {
      if(req.body) { 
        await ToDoRepository.create(req.body);
        res.status(201).json();
      } else {
        res.status(404).json({ message: "Todo is required." });
      }
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }

  async updateTodoById(req, res) {
    try {
      let todoId = req.params.id;
      const lookUpForTodo = await ToDoRepository.findById(todoId);
      if (lookUpForTodo.length) {
        await ToDoRepository.update(req.body, todoId);
        res.status(204).json();
      } else {
        res.status(404).json({ message: Constants.TODO_NOT_FOUND() });
      }
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }

  async updateTodoStatusById(req, res) {
    try {
      let todoId = req.params.id;
      const lookUpForTodo = await ToDoRepository.findById(todoId);
      if (lookUpForTodo.length) {
        await ToDoRepository.updateStatus(req.params.status, req.params.id);
        res.status(204).json();
      } else {
        res.status(404).json({ message: Constants.TODO_NOT_FOUND() });
      }
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }

  async deleteTodoById(req, res) {
    try {
      await ToDoRepository.delete(req.params.id);
      res.status(204).json();
    } catch (e) {
      res
        .status(400)
        .json({ message: Constants.METHOD_ERROR(), error: e });
    }
  }
}

export default new ToDoController();
