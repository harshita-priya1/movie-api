const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/all", (req, res) => {
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

app.get("/search", (req, res) => {
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

app.get("/rating/:r", (req, res) => {
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

app.get("/popular", (req, res) => {
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

app.get("/released/:ry", (req, res) => {
  const pg = parseInt(req.query.pg) || 0;
  const item = parseInt(req.query.item) || 5;
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
      const startIndex = pg * item;
      const newResult = [];
      for (let i = startIndex; i < item + startIndex; i++) {
        newResult.push(results[i]);
      }
      res.json(newResult);
    });
});

app.get("/director", (req, res) => {
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

app.get("/actor", (req, res) => {
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

app.get("/free", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
