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
                body: JSON.stringify({newTodo})
            });
            const data = await response.json();
            setTodos([...todos, data]);
            setNewTodo("");
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    }

    function handleDelete(e) {
        const id = e.target.parentNode.id;

        setTodos(
            todos.filter((todo, idx) => {
                return Number(id) !== idx;
            })
        );
    }

    function startEdit(todo) {
        const curElement = document.getElementById(`${todo.id}`);
        curElement.innerHTML = `
            <div className="todo" key="${todo.id}" id="${todo.id}">
                <li>${todo.text}</li>
                <button id="saveBtn">Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        `;
        return curElement;
    }

    function handleEdit(event) {
        const curElement = event.target;
        if (curElement.id === 'editBtn') {
            const idx = curElement.parentNode.id;
            const text = curElement.parentNode.firstChild.innerText;
            console.log(text);
        }
    }

    function toggleComplete(event) {

        const curElement = event.target;

        if (curElement.className.includes("checked")) {
            curElement.className = curElement.className.replace("checked", "");
        } else {
            curElement.className = `${curElement.className} checked`
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
                <button id="addBtn" onClick={handleAdd}>Add</button>
            </div>
            
            <ul className="todos">
                {todos.map((todo, idx) => {
                    return (
                        <div className="todo" key={idx} id={idx}>
                            <li onClick={toggleComplete}>{todo}</li>
                            <button id="editBtn" onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>&#x2715;</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
