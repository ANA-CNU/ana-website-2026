import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import express, { Express } from 'express';
import mongoose from 'mongoose';

const app: Express = express();

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

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`serving on port ${ PORT }`);
});