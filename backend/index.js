import express from "express";
import { PORT, mongoURI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Welcome from backend");
});

// Book Creation Process

app.post("/books", async (req, res) => {
  try {
    //If Any field miss from req
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please insert all value!");
    }
    const bookExist = await Book.findOne({ title: req.body.title });
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

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get All books from DB
app.get("/books", async (req, res) => {
  try {
    const allBook = await Book.find({});
    return res.status(200).send({
      count: allBook.length,
      allBook,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get One Book from DB
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update a book
app.put('/books/:id',(req,res) => {
  try {
    const { id } = req.params
    const { title, author, publishYear } = req.body
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

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
