import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app= express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

//api end points
app.get('/',(req,res)=>{
    res.send('api workinggg');
})
app.use('/api/auth',authRouter)
app.use('/api/data',userRouter)

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})
