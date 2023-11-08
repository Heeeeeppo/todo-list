const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/27017')
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
