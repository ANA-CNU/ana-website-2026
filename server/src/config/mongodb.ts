import mongoose from 'mongoose';

export default async () => {
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
}