import express from 'express';
import morgan from 'morgan';
import TasksRoutes from './routes/tasks.routes';

const app = express();

//Settings
app.set('port', process.env.PORT || 33001);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my API' });
})

app.use('/api/tasks', TasksRoutes);

export default app;