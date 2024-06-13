"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../models/task");
const router = (0, express_1.Router)();
// Route to get all tasks
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.Task.findAll();
    res.json(tasks);
}));
// Route to create a new task
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const task = yield task_1.Task.create({ title, description });
    res.json(task);
}));
// Route to upgrade a task
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = yield task_1.Task.findByPk(id);
    if (task) {
        task.title = title;
        task.description = description;
        task.completed = completed;
        yield task.save();
        res.json(task);
    }
    else {
        res.status(404).send('Task not found');
    }
}));
// Route to delete a task
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield task_1.Task.findByPk(id);
    if (task) {
        yield task.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Task not found');
    }
}));
exports.default = router;
