import Task from '../models/Task'

export const findALLTaks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false
    })
    const taskSaved = await newTask.save()
    res.json(taskSaved)
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
    const tasks = await Task.find({ status: true })
    res.json(tasks)
}

export const updateTask = async (req, res) => {
   await Task.findByIdAndUpdate(req.params.id, req.body)
   res.json({message: 'Task was updated successfully'})
}