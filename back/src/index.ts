import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server running ${port}`);
});