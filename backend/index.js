import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleare for parsing request body
app.use(express.json());

//MIddleware for handling CORS Policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("welcome to MERN")
});

//middleware: with each request prefix of /books handle them with this middleware and so we changed our routes
app.use("/books", booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`Book Store App running on port ${PORT}...`)
        });
    })
    .catch((error) => {
        console.log(error)
    })