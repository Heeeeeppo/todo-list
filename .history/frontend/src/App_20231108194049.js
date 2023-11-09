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
          setTodos(todos.filter((todo) => id !== todo._id));
        } catch (error) {
          console.error("Failed to delete a task");
        }
      }

      function startEdit(id) {
        const todoToUpdate = todos.find((todo) => todo._id === id);
        const newText = prompt("Enter new text", todoToUpdate.text);
        if (newText !== null) {
          handleEdit(id, newText);
        }
      }

    async function handleEdit(id, newText) {
        try {
          await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newText,
                completed: true
            })
          });
    
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, text: newText, completed: false } : todo
            )
          );
          fetchTask()
          console.log(todos)
        } catch (error) {
          console.error("Failed to edit task:", error);
        }
      }

    // document.addEventListener("click", async (event) => {
    //     // event.stopPropagation();
    //     const curElement = event.target;
    //     // console.log(curElement)
    //     if (curElement.id === 'editBtn') {
    //         const id = curElement.parentNode.id;

    //         let taskToUpdate = todos.find((todo) => todo._id === id);
    //         // const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    //         // const text = curElement.parentNode.firstChild.innerText;
    //         const todo = todos.find((todo) => todo._id === id);
    //         console.log(todo)
    //         // startEdit(todo);
    //         // const saveBtn = document.getElementById(`saveBtn${id}`);
    //         // saveBtn.addEventListener("click", async () => {
    //         //     const input = document.getElementById(`input${todo._id}`);
    //         //     const text = input.value;
    //         //     // console.log(text)
    //         //     if (text) {
    //         //         try {
    //         //             await fetch(`${BASE_URL}/${id}`, {
    //         //                 method: 'PUT',
    //         //                 headers: {
    //         //                     'Content-Type': 'application/json'
    //         //                 },
    //         //                 body: JSON.stringify({
    //         //                     text,
    //         //                     completed: true
    //         //                 })
    //         //             });
    //         //             console.log(text);
    //         //             console.log(typeof text)
    //         //             taskToUpdate.text = text;

    //         //             taskToUpdate.completed = true;
    //         //             console.log(taskToUpdate)
    //         //             setTodos((prevTodos) =>
    //         //             prevTodos.map((todo) =>
    //         //                 todo._id === id ? { ...todo, taskToUpdate } : todo
    //         //             )
                        
    //         //             );
                        
    //         //             saveTodo(taskToUpdate)
    //         //         } catch (error) {
    //         //             console.error("Failed to edit task:", error);
    //         //         }
    //         //     }
    //         // })
    //     }
    // }, {once: true})

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
                            <button id="editBtn" onClick={() => startEdit(todo._id)} >Edit</button>
                            <button id="deleteBtn" onClick={handleDelete}>&#x2715;</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
