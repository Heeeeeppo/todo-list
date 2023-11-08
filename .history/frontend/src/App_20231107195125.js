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

    function handleDelete(e) {
        const id = e.target.parentNode.id;

        setTodos(
            todos.filter((todo, idx) => {
                return Number(id) !== idx;
            })
        );
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
                <button className="addBtn" onClick={handleAdd}>Add</button>
            </div>
            
            <ul className="todos">
                {todos.map((todo, idx) => {
                    return (
                        <div className="todo" key={idx} id={idx}>
                            <li>{todo}</li>
                            <button>Edit</button>
                            <button onClick={handleDelete}>&#x2715;</button>
                        </div>
                    )
                })}
                {/* <li className="todo">

                </li>
                <div className="todo">
                    <div className="checkbox"></div>
                    <div className="text">Get up</div>
                    <div className="delete-todo">x</div>
                </div>

                <div className="todo completed">
                    <div className="checkbox"></div>
                    <div className="text">Get the milk</div>
                    <div className="delete-todo">x</div>
                </div> */}
            </ul>
        </div>
    );
}

export default App;
