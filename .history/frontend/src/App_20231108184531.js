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
                body: JSON.stringify({text: newTodo})
            });
            const data = await response.json();
            setTodos([...todos, data]);
            setNewTodo("");
        } catch (error) {
            console.error("Failed to add task:", error);
        }
        // console.log(todos);
    }

    async function handleDelete(e) {
        
        const id = e.target.parentNode.id;

        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTodos(
                todos.filter((todo) => {
                    return id !== todo._id;
                })
            );
        } catch (error) {
            console.error("Failed to delte a task");
        }
        
        
    }

    function startEdit(todo) {
        const curElement = document.getElementById(`${todo._id}`);
        // console.log(curElement);
        // console.log(todo.text)
        curElement.innerHTML = `
            <li><input type="text" id="input${todo._id}" value="${todo.text}"/></li>
            <button id="saveBtn${todo._id}">Save</button>
            <button onClick={handleCancel}>Cancel</button>
        `;
        return curElement;
    }

    function saveTodo(todo) {
        const curElement = document.getElementById(`${todo._id}`);
        curElement.innerHTML = `
        <li onClick={toggleComplete}>"${todo.text}"</li>
            <button id="editBtn" onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>&#x2715;</button>
        `;
        return curElement;
    }

    async function handleEdit(event) {
        const curElement = event.target;
        if (curElement.id === 'editBtn') {
            const id = curElement.parentNode.id;

            let taskToUpdate = todos.find((todo) => todo._id === id);
            // const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

            // const text = curElement.parentNode.firstChild.innerText;
            const todo = todos.find((todo) => todo._id === id);
            startEdit(todo);
            const saveBtn = document.getElementById(`saveBtn${id}`);
            saveBtn.addEventListener("click", async () => {
                const input = document.getElementById(`input${todo._id}`);
                const text = input.value;
                // console.log(text)
                if (text) {
                    try {
                        await fetch(`${BASE_URL}/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                text,
                                completed: true
                            })
                        });
                        taskToUpdate.text = text;
                        taskToUpdate.completed = true;
                        console.log(taskToUpdate)
                    //     setTodos((prevTodos) =>
                    //     prevTodos.map((todo) =>
                    //       todo._id === id ? { ...todo, taskToUpdate } : todo
                    //     )
                        
                    //   );
                      
                        // saveTodo(taskToUpdate)
                    } catch (error) {
                        console.error("Failed to edit task:", error);
                    }
                }
            })
        }
    }

    async function toggleComplete(event) {

        const curElement = event.target;
        const id = curElement.parentNode.id;
        const taskToUpdate = todos.find((todo) => todo._id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        
        if (curElement.className.includes("checked")) {
            curElement.className = curElement.className.replace("checked", "");
        } else {
            curElement.className = `${curElement.className} checked`
        }
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        } catch (error) {
            console.error("Failed to toggle task:", error);
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
                {todos.map((todo) => {
                    return (
                        <div className="todo" key={todo._id} id={todo._id}>
                            {todo.completed ? 
                                <li className="checked" onClick={toggleComplete}>{todo.text}</li> 
                                : <li onClick={toggleComplete}>{todo.text}</li>}
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
