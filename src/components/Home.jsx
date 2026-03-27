import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo.trim()) return;

    setTodos([
      ...todos,
      { id: uuidv4(), todo: todo.trim(), isCompleted: false },
    ]);
    setTodo("");
  };

  const handleEdit = (id) => {
    const item = todos.find((i) => i.id === id);
    if (!item) return;

    setTodo(item.todo);
    setTodos(todos.filter((i) => i.id !== id));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const handleClearAll = () => {
    if (!window.confirm("Are you sure you want to delete all todos?")) return;
    localStorage.removeItem("todos");
    setTodos([]);
  };

  return (
    <main className="bg-gray-300 min-h-[85vh] rounded-2xl w-[96%] max-w-[900px] mx-[2%] sm:mx-6 md:mx-auto mt-6 overflow-hidden">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl flex justify-center p-4 sm:p-6 bg-slate-700 text-white w-full">
        To-Do List
      </h1>

      <div className="flex flex-col px-3 sm:px-5 w-full justify-center my-6">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="bg-white rounded-xl p-2 m-auto w-full sm:w-[80%]"
          type="text"
          placeholder="Add todo"
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mx-auto w-full sm:w-[80%] my-3">
          <button
            onClick={handleAdd}
            disabled={!todo.trim()}
            className="bg-slate-700 text-white px-4 py-2 sm:py-1 rounded-xl w-full sm:w-auto "
          >
            Add Task
          </button>

          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white px-4 py-2 sm:py-1 rounded-xl w-full sm:w-auto"
          >
            Clear All
          </button>
        </div>
      </div>

      <h2 className="font-bold px-4 text-lg sm:text-xl pb-2 w-full sm:w-[80%] mx-auto">
        Your Todos
      </h2>

      <div className="flex flex-col w-full sm:w-[80%] mx-auto p-5 max-h-[300px] overflow-y-auto scroll-smooth no-scrollbar ">
        {todos.length === 0 && (
          <div className="text-gray-500 text-center py-4">
            No todos available.
          </div>
        )}

        {todos.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center my-2 gap-2"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckbox(item.id)}
              />

              <div
                className={`truncate ${
                  item.isCompleted ? "line-through text-gray-500" : ""
                }`}
              >
                {item.todo}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(item.id)}
                className="bg-slate-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-slate-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;