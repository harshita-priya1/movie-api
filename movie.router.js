const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const movieRouter = express.Router();

movieRouter.get("/all", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/search", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const n1 = req.query.name;
  const name = n1.toLowerCase();
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const title = data.title.toLowerCase();
      if (title.includes(name)) {
        results.push(data);
      }
    })
    .on("end", () => {
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/rating/:r", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const rate = req.params.r;
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const rating = data.Movie_Rating;
      if (rating >= rate) {
        results.push(data);
      }
    })
    .on("end", () => {
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/popular", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      results.sort(
        (a, b) => parseInt(b.No_of_Ratings) - parseInt(a.No_of_Ratings)
      );
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/released/:ry", (req, res) => {
  let pg = parseInt(req.query.pg) || 1;
  let item = parseInt(req.query.item) || 5;
  const ry = req.params.ry;

  const results = [];

  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())

    .on("data", (data) => {
      if (ry === data.ReleaseYear) {
        results.push(data);
      }
    })

    .on("end", () => {
      results.sort(
        (a, b) => parseInt(b.Movie_Rating) - parseInt(a.Movie_Rating)
      );
      const ressize = results.length;
      let startIndex = (pg - 1) * item;
      const newResult = [];

      if (startIndex >= ressize) {
        if (item > ressize) item = 5;
        startIndex = ressize - (ressize % item ? ressize % item : item);
        if (pg * item > ressize) pg = Math.floor(ressize / item) + 1;
      }

      for (let i = startIndex; i < item + startIndex && i < ressize; i++) {
        newResult.push(results[i]);
      }
      let totalpages = Math.floor(ressize / item) + 1;
      res.json({
        pageno: pg,
        totalpages: totalpages,
        totalItems: ressize,
        data: newResult,
      });
    });
});

movieRouter.get("/director", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const n1 = req.query.name;
  const name = n1.toLowerCase();
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const director = data.Directed_By.toLowerCase();
      if (director.includes(name)) {
        results.push(data);
      }
    })
    .on("end", () => {
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/actor", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const n1 = req.query.name;
  const name = n1.toLowerCase();
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const actor = data.Starring.toLowerCase();
      if (actor.includes(name)) {
        results.push(data);
      }
    })
    .on("end", () => {
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

movieRouter.get("/free", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
  const free = [];
  const paid = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      if (data.Price === "") {
        free.push(data);
      } else {
        paid.push(data);
      }
    })
    .on("end", () => {
      paid.sort((a, b) => a.Price - b.Price);
      free.sort((a, b) => b.Movie_Rating - a.Movie_Rating);
      const results = free.concat(paid);
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

module.exports = movieRouter;
