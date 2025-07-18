import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './routes/users.route';
const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());



app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server running ${port}`);
});