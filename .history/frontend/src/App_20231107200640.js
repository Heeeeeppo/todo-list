import { useState } from "react";

function App() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    function handleChange(event) {
        setNewTodo(event.target.value);
    }

    function handleAdd() {
        if (newTodo.trim() !== "") {
            setTodos((prev) => {
                return [...prev, newTodo];
            });
            setNewTodo("");
        } else {
            alert("Please check your input!");
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

    function handleEdit(event) {
        const curElement = event.target;

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
                <label for="text">Create a new Todo: </label>
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
                            <button id="editBtn">Edit</button>
                            <button onClick={handleDelete}>&#x2715;</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
