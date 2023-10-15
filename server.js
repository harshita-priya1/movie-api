const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/all", (req, res) => {
  const results = [];
  fs.createReadStream("./data/movies_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      res.json(results);
    });
});

app.get("/search", (req, res) => {
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
      res.json(results);
    });
});

app.get("/rating/:r", (req, res) => {
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
      res.json(results);
    });
});

app.get("/popular", (req, res) => {
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
      res.json(results);
    });
});

app.get("/released/:ry", (req, res) => {
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
      res.json(results);
    });
});

app.get("/director", (req, res) => {
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
      res.json(results);
    });
});

app.get("/actor", (req, res) => {
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
      res.json(results);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
