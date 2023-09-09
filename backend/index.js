import express from "express";
import { PORT, mongoURI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Welcome from backend");
});

app.use(cors());

app.use("/books", bookRoutes);

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
