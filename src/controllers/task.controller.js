import Task from '../models/Task'

export const findALLTaks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something goes wrong retrieving the tasks'
        });
    }
};

export const createTask = async (req, res) => {
    
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
    const task = await Task.findById(req.params.id)
    res.json(task)
}

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({
        message: 'task were deleted sucessfully'
    })
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