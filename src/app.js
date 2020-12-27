import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from './routes/tasks.routes';

const app = express();

//Settings
app.set('port', process.env.PORT || 33001);

//middlewares
const corsOption = {
    origin: 'hppt://localhost:33001',
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my API' });
})

app.use('/api/tasks', TasksRoutes);

export default app;