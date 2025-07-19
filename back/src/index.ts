import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './routes/users.route';
import productRoutes from './routes/products.route';
import categoriRoutes from './routes/categories.route';
import cartRoutes from './routes/carts.route';
import orderRoutes from './routes/orders.route';
const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());



app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoriRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.listen(port, () => {
    console.log(`Server running ${port}`);
});