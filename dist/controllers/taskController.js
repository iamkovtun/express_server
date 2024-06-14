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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const task_1 = require("../models/task");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.Task.findAll();
    res.json(tasks);
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const task = yield task_1.Task.create({ title, description });
    res.json(task);
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield task_1.Task.findByPk(id);
    if (task) {
        yield task.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Task not found');
    }
});
exports.deleteTask = deleteTask;
