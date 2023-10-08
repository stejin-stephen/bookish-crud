import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import booksRoute from './routes/booksRoute.js'

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Welcome')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`App is listening: ${PORT}`)
        })
    })
    .catch((err) => console.error(err))