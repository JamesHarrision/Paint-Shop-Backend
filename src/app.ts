import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import { prisma } from './config/prisma';
import authRoutes from './routes/authRoutes'

const app = express();

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

//Route
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Paint Shop API 🚀' });
});


export default app