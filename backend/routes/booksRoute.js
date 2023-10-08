import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req?.body?.title || !req?.body?.author || !req?.body?.year) {
            return res.status(400).json({
                message: 'Required fields missing'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json({ message: 'Book updated' });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id, req.body)

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
});

export default router;