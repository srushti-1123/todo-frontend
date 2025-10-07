import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const BASE_URL = "http://127.0.0.1:5001";

  // Fetch all tasks
  useEffect(() => {
    axios.get(`${BASE_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!text.trim()) return;
    axios.post(`${BASE_URL}/tasks`, { text })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setText("");
  };

  // Toggle completion
  const toggleTask = (id) => {
    axios.put(`${BASE_URL}/tasks/${id}`)
      .then(res => setTasks(tasks.map(t => (t.id === id ? res.data : t))))
      .catch(err => console.error(err));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`${BASE_URL}/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.error(err));
  };
  // Mark all tasks as complete
const markAllComplete = () => {
  const updatedTasks = tasks.map(t => ({ ...t, completed: true }));
  setTasks(updatedTasks);
};

// Clear all completed tasks
const clearCompleted = () => {
  const remainingTasks = tasks.filter(t => !t.completed);
  setTasks(remainingTasks);
};


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 To-Do App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "8px", width: "250px" }}
      />
      <button onClick={addTask} style={{ marginLeft: "10px", padding: "8px 15px" }}>
        Add
      </button>
      <div style={{ marginTop: "20px", fontWeight: "bold", color: "#ff6b6b" }}>
  Pending Tasks: {tasks.filter(t => !t.completed).length}
</div>

      <div style={{ marginTop: "20px" }}>
  <button onClick={markAllComplete} style={{ marginRight: "10px", padding: "8px 15px" }}>
    Mark All Complete
  </button>
  <button onClick={clearCompleted} style={{ padding: "8px 15px" }}>
    Clear Completed
  </button>
</div>


      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? "task completed" : "task"}>
  <span onClick={() => toggleTask(t.id)}>
    {t.text}
  </span>
  <button onClick={() => deleteTask(t.id)}>❌</button>
</li>

        ))}
      </ul>
    </div>
  );
}

export default App;
