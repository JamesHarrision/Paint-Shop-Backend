import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import path from 'path';
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import aiRoutes from './routes/aiRoutes'
import userRoutes from './routes/userRoutes'

const app = express();

//Middleware for static file
// Serve Static Files (Mở quyền truy cập folder uploads)
// User truy cập: http://localhost:3000/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

//Route
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/v1/ai', aiRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Paint Shop API 🚀' });
});


export default app