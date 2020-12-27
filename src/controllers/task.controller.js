import Task from '../models/Task';
import { getPagination } from '../libs/getPagination';

export const findALLTaks = async (req, res) => {
    try {
        const { size, page, title } = req.query;

        const condition = title ? { title: { $regex: new RegExp(title), $options: "i" }, } : {};

        const { limit, offset } = getPagination(page, size);

        const data = await Task.paginate(condition, { offset, limit });
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the tasks'
        });
    }
};

export const createTask = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({ message: 'Content cannot be empty' });
    }

    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status ? req.body.status : false
        })
        const taskSaved = await newTask.save()
        res.json(taskSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong creating a task'
        });
    }
}

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(400).json({ message: `this task with id ${id} does not exists` });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving task with id ${id}`
        });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({
            message: 'task were deleted sucessfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error to delete this task ${id}`
        });
    }
}

export const findAllDoneTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ status: true })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the tasks done'
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'Task was updated successfully' })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong to updating this task'
        });
    }
}