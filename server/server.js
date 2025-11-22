import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebhooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
//initialize Express

const app = express()

//connect to database
await connectDB()

//middlewares
app.use(cors())


//Routes
app.get('/', (req, res)=> res.send("API Hoạt Động"))
app.post('/clerk', express.json(), clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

//listen server
app.listen(PORT, ()=> 
    {console.log(`Server is running on port ${PORT}`)})