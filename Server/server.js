
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(express.json({ limit: '50mb' })); // to parse json data in the request body
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes)

// http://localhost:5000 => backend, frontend

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/Client/dist')));

    // react app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'Client', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
