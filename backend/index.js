import express from "express";
import { PORT, mongoURI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json())
app.get("/", (req, res) => {
  return res.send("Welcome from backend");
});

// Book Creation Process

app.post("/book", async (req, res) => {
  try {
    //If Any field miss from req
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please insert all value!");
    }
    const bookExist = await Book.findOne({ title: req.body.title })
    if (bookExist) {
      return res.status(400).send("Book already exist!");
    }
    // Creating new book
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send( book );

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("DB Connected successfully....");
    app.listen(PORT, () => {
      console.log(`App start on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
