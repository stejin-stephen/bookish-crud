import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Welcome')
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