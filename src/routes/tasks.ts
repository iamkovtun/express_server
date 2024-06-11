import { Router, Request, Response } from 'express';
import { Task } from '../models/task'; 

const router = Router();

// Route to get all tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Route to create a new task
router.post('/', async (req: Request, res: Response) => {
  const {title, description} = req.body;
  const task = await Task.create({ title, description });
  res.json(task);
});

// Route to upgrade a task
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed} = req.body;
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
  });

// Route to delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task) {
    await task.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
});

export default router;
