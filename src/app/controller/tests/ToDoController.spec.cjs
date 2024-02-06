const ToDoController = require("../ToDoController");
const ToDoRepository = require("../../repositories/ToDoRepository");
const DbConnection = require("../../db/connection");
const { default: Constants } = require("../../util/Constants");

jest.mock("../../repositories/ToDoRepository");
jest.mock("../../db/connection");

beforeAll((done) => {
  DbConnection.conn.getConnection.mockImplementation((callback) => {
    const fakeConnection = {}; // Criar um objeto de conexão fictício, se necessário
    callback(null, fakeConnection);
  });
  done();
});

afterAll((done) => {
  DbConnection.conn.end.mockImplementation((callback) => {
    callback(null);
  });
  done();
});

function sum(a, b) {
  return a + b;
}

describe("My First Jest Test", () => {
  test("First unit test", () => {
    const firstArgument = 7;
    const secondArgument = 1;

    let result = sum(firstArgument, secondArgument);
    expect(result).toEqual(firstArgument + secondArgument);
  });
});

// describe("TODO Controller Tests", () => {
//   test("should be able to get TODOs list using GET", async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await ToDoController.default.getAllTodos(req, res);

//     expect(ToDoRepository.default.findAll).toHaveBeenCalledTimes(1);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

describe("TODO Controller Tests", () => {
  describe("createTodo", () => {
    test("should create a new TODO and return status 201", async () => {
      const req = {
        body: {
          owner: "Test Owner",
          description: "Test Description",
          status: 0,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the create method in the repository
      ToDoRepository.default.create.mockResolvedValueOnce();

      await ToDoController.default.createTodo(req, res);

      expect(ToDoRepository.default.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    test("should return status 404 if request body is empty", async () => {
      const req = {
        body: null,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ToDoController.default.createTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: Constants.METHOD_ERROR(),
      });
    });
  });

  describe("updateTodoById", () => {
    test("should update an existing TODO and return status 204", async () => {
      const req = {
        params: {
          id: "5",
        },
        body: {
          title: "Updated Test Todo",
          description: "Updated Test Description",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findById and update methods in the repository
      ToDoRepository.default.findById.mockResolvedValueOnce([{ id: "5" }]);
      ToDoRepository.default.update.mockResolvedValueOnce();

      await ToDoController.default.updateTodoById(req, res);

      expect(ToDoRepository.default.findById).toHaveBeenCalledWith("5");
      expect(ToDoRepository.default.update).toHaveBeenCalledWith(
        req.body,
        req.params.id
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalled();
    });

    test("should return status 404 if the TODO to update is not found", async () => {
      const req = {
        params: {
          id: "456",
        },
        body: {
          title: "Updated Todo",
          description: "Updated description",
          status: 0
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ToDoRepository.default.findById.mockResolvedValueOnce([]);

      await ToDoController.default.updateTodoById(req, res);

      expect(ToDoRepository.default.findById).toHaveBeenCalledWith("456");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: Constants.METHOD_ERROR(),
      });
    });
  });
});
