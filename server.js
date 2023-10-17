const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const movieRouter = require("./movie.router");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", movieRouter);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
