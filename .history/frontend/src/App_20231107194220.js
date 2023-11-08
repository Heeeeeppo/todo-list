import { useState } from "react";

function App() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    function handleChange(event) {
        setNewTodo(event.target.value);
    }

    function handleAdd() {
        setTodos((prev) => {
            return [...prev, newTodo];
        });
        setNewTodo("");
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
                <button onClick={handleAdd}>Add</button>
            </div>
            
            <div className="todos">
                <div className="todo">
                    <div className="checkbox"></div>
                    <div className="text">Get up</div>
                    <div className="delete-todo">x</div>
                </div>

                <div className="todo completed">
                    <div className="checkbox"></div>
                    <div className="text">Get the milk</div>
                    <div className="delete-todo">x</div>
                </div>
            </div>
        </div>
    );
}

export default App;
