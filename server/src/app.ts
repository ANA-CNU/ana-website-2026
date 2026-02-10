import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';

import adminConfig from './config/admin';
import passportConfig from './config/passport';
import mongodbConfig from './config/mongodb';
passportConfig();

import apiRoutes from './routes/api';


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
	Object.defineProperty(req, 'query', {
		...Object.getOwnPropertyDescriptor(req, 'query'),
		value: req.query,
		writable: true,
	})

	next()
})
app.use(ExpressMongoSanitize());
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, crossOriginOpenerPolicy: false })); // 배포할때 coop 빼셈
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

const startServer = async () => {
    await mongodbConfig();
    await adminConfig();
    
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`serving on port ${ PORT }`);
    });
}

startServer();