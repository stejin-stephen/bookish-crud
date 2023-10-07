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

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(201).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        if (!req?.body?.title || !req?.body?.author || !req?.body?.year) {
            return res.status(400).json({
                message: 'Required fields missing'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        console.log('result', result)

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json({ message: 'Book updated' });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`App is listening: ${PORT}`)
        })
    })
    .catch((err) => console.error(err))