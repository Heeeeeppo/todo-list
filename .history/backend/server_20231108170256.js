const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
// app.options('*', cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
app.use(express.json());

mongoose.connect('mongodb://localhost/todo-list')
    .then(() => console.log("Connected to databse"))
    .catch(console.error);

const Task = require('./models/Task');

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

app.post('/tasks', (req, res) => {
    const task = new Task({
        text: req.body.text
    });
    task.save();
    res.json(task);
})

app.delete('/tasks/:id', async (req, res) => {
    const result = await Task.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;

    task.save();
    res.json(task);
})

app.listen(3001, () => console.log("Server started on port 3001"));
