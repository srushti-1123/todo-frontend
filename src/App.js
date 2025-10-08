import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      priority: priority,
      dueDate: dueDate,
    };
    setTodos([...todos, newTodo]);
    setInput("");
    setDueDate("");
    setPriority("Medium");
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit todo
  const editTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    const newText = prompt("Edit your task:", todo.text);
    if (newText) {
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
      );
    }
  };

  // Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true;
  });

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="app">
      <h1>My To-Do App</h1>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-container">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
            data-priority={todo.priority}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                color: todo.dueDate === today ? "#ff4d6d" : "inherit",
              }}
            >
              {todo.text}{" "}
              {todo.dueDate && (
                <span className="due-date">({todo.dueDate})</span>
              )}
            </span>
            <div className="actions">
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
