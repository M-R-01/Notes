import express from 'express';
import { PORT } from './config.js';
import { MONGODBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());


app.use('/notes', noteRoutes);

mongoose.connect(MONGODBURL)
    .then(() => {
        console.log('Connected');
        app.listen(PORT, () => {
            console.log(`Port is running on ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })



