import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import { Book } from './models/bookModel.js';

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Welcome')
})

app.post('/books', async (req, res) => {
    try {
        if (!req?.body?.title || !req?.body?.author || !req?.body?.year) {
            return res.status(400).json({
                message: 'Required fields missing'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.year
        }

        const book = await Book.create(newBook);

        return res.status(201).json(book);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`App is listening: ${PORT}`)
        })
    })
    .catch((err) => console.error(err))