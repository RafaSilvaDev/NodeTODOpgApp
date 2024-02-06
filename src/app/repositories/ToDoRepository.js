import { operation } from "../db/connection.js";

class ToDoRepository {
  findAll() {
    const sql = "SELECT * FROM todo";
    return operation(sql);
  }

  findById(id) {
    const sql = "SELECT * FROM todo WHERE todo.id = ?";
    return operation(sql, id);
  }

  create(todo) {
    const sql = "INSERT INTO todo SET ?";
    return operation(sql, todo);
  }

  update(todo, todoId) {
    const sql = "UPDATE todo SET ? WHERE id = ?";
    return operation(sql, [todo, todoId]);
  }

  updateStatus(status, todoId) {
    const sql = "UPDATE todo SET todo.status = ? WHERE id = ?";
    return operation(sql, [status, todoId]);
  }

  delete(todoId) {
    const sql = "DELETE FROM todo WHERE id = ?";
    return operation(sql, todoId);
  }
}

export default new ToDoRepository();
