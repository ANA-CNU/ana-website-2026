import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import cors from 'cors';

import passportConfig from './config/passport';
passportConfig();
import mongodbConfig from './config/mongodb';
mongodbConfig();

import apiRoutes from './routes/api';


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }}));
app.use(passport.initialize());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.use('/api', apiRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    const { message = 'oh no, Error!!', statusCode = 500 } = error;

    res.status(statusCode).json({ message: message, success: false });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`serving on port ${ PORT }`);
});