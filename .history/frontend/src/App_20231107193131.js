import { useState } from "react";

function App() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    function handleChange(event) {
        setNewTodo(event.target.value);
    }

    return (
        <div className="App">
            <h2>Your Tasks</h2>
            <div className="inputField">
                <label for="text">Todo</label>
                <input 
                    type="text" 
                    name="text" 
                    onChange={handleChange} 
                    value={newTodo} 
                    placeholder="Create a new todo"
                />
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
