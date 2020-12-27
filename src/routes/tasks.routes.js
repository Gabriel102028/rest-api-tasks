import { Router } from 'express';
import * as tasksController from '../controllers/task.controller';

const router = Router();

router.get('/', tasksController.findALLTaks);

router.post('/', tasksController.createTask);

router.get('/done', tasksController.findAllDoneTasks);

router.get('/:id', tasksController.findOneTask);

router.delete('/:id', tasksController.deleteTask);

router.put('/:id', tasksController.updateTask);

export default router;