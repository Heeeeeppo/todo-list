import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:3001/tasks';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  async function fetchTask() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  async function handleAdd() {
    if (newTodo.trim() === "") {
      alert("Please check your input!");
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTodo })
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTodos(todos.filter((todo) => id !== todo._id));
    } catch (error) {
      console.error("Failed to delete a task");
    }
  }

  async function handleEdit(id, newText) {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, text: newText } : todo
        )
      );
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  }

  function startEdit(id) {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    const newText = prompt("Enter new text", todoToUpdate.text);
    if (newText !== null) {
      handleEdit(id, newText);
    }
  }

  return (
    <div className="App">
      <h1>Your Todos</h1>
      <div className="inputField">
        <label htmlFor="text">Create a new Todo: </label>
        <input
          type="text"
          name="text"
          onChange={handleChange}
          value={newTodo}
          placeholder="Type something.."
        />
        <button id="addBtn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className="todos">
        {todos.map((todo) => (
          <div className="todo" key={todo._id} id={todo._id}>
            {todo.completed ? (
              <li className="checked" onClick={toggleComplete}>
                {todo.text}
              </li>
            ) : (
              <li onClick={toggleComplete}>{todo.text}</li>
            )}
            <button id="editBtn" onClick={() => startEdit(todo._id)}>
              Edit
            </button>
            <button id="deleteBtn" onClick={() => handleDelete(todo._id)}>
              &#x2715;
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;