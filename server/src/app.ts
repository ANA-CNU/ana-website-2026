import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './config/passport';
passportConfig();

import apiRoutes from './routes/api';


const MONGO_URL: string = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ana-website';
async function connectMongo() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('mongo connection success!!');
    } catch (error) {
        console.log('mongo connection fail..');
        console.log(error);
    }
}
connectMongo();


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());


app.use('/api', apiRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    const { message = 'oh no, Error!!', statusCode = 500 } = error;

    res.status(statusCode).json({ message: message, success: false });
});

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`serving on port ${ PORT }`);
});