import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import { prisma } from './config/prisma';

const app = express();

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

//Test Route
app.get('/', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.status(200).json({
      message: 'Welcome to Paint Shop API',
      database: 'Connected to mySQL',
      userCount: userCount
    });
  }
  catch (error) {
    res.status(500).json({
      messege: 'Database connection failed',
      error: error
    })
  }
});

export default app