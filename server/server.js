import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebhooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';


//initialize Express

const app = express()

//connect to database
await connectDB()
await connectCloudinary()

//middlewares
app.use(cors())
app.use(clerkMiddleware())


//Routes
app.get('/', (req, res)=> res.send("API Hoạt Động"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);

//port
const PORT = process.env.PORT || 5000

//listen server
app.listen(PORT, ()=> 
    {console.log(`Server is running on port ${PORT}`)})