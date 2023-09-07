import express from 'express'

import { Book } from "../models/bookModel.js";

const router=express.Router()
// Book Creation Process
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "Please insert all values!" });
    }
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    // Update the book only if it exists
    await Book.findByIdAndUpdate(id, req.body);

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete the book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (!bookDeleted) {
      return res.status(404).send({ message: "No book found to delete" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
export default router