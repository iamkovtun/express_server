import { Request, Response } from 'express';
import { Task } from '../models/task';

interface TaskRequest extends Request {
  body: {
    title: string
    description: string
    completed: boolean
  }
  params: {
    id: string
  }
}

export const getAllTasks = async (req: TaskRequest, res: Response): Promise<void> => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

export const createTask = async (req: TaskRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  res.json(task);
};

export const updateTask = async (req: TaskRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await Task.findByPk(id);
  if (task) {
    task.title = title;
    task.description = description;
    task.completed = completed;
    await task.save();
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

export const deleteTask = async (req: TaskRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task) {
    await task.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
};
