import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './routes/users.route';
import productRoutes from './routes/products.route';
import categoriRoutes from './routes/categories.route';
const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());



app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoriRoutes);

app.listen(port, () => {
    console.log(`Server running ${port}`);
});