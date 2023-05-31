const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();
require("express-async-errors");

/* CONNECT TO DB */
const connectDB = require("./db/connect");

const morgan = require("morgan");

/* MIDDLEWARE */
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-commerce");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
      console.log("DB Connected...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
