import { operation } from "../db/connection.js";

class ToDoRepository {
  async findAll() {
    const sql = "SELECT * FROM todo";
    return await operation(sql);
  }

  async findById(id) {
    const sql = "SELECT * FROM todo WHERE todo.id = $1";
    return await operation(sql, [id]);
  }

  async create(todo) {
    const sql = "INSERT INTO todo (owner, description, status) VALUES ($1, $2, $3)";
    return await operation(sql, [todo.owner, todo.description, todo.status]);
  }

  async update(todo, todoId) {
    const sql = "UPDATE todo SET owner=$1, description=$2, status=$3 WHERE id = $4";
    return await operation(sql, [todo.owner, todo.description, todo.status, todoId]);
  }

  async updateStatus(status, todoId) {
    const sql = "UPDATE todo SET status = $1 WHERE id = $2";
    return await operation(sql, [status, todoId]);
  }

  async delete(todoId) {
    const sql = "DELETE FROM todo WHERE id = $1";
    return await operation(sql, [todoId]);
  }
}

export default new ToDoRepository();
