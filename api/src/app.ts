import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { STATUS_CODE } from './enums/status.enum';
import authRoutes from './modules/auth/auth.routes';
import categoryRoutes from './modules/categories/category.routes';
import productRoutes from './modules/products/product.routes';

const app = express();

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Health check route
app.get('/', (_, res) => {
  return res.status(STATUS_CODE.OK).json({
    code: STATUS_CODE.OK,
    message: 'Mini E-commerce API is running!',
  });
});

app.use((_, res) => {
  return res.status(STATUS_CODE.OK).json({
    code: STATUS_CODE.NOT_FOUND,
    message: 'Route not found',
  });
});

export default app;
