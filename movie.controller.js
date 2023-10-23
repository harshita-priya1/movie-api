const { getAll } = require("./movie.model");

function getAllMovies(req, res) {
  getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).json({ error: "An Error Occured!" });
    });
}
function searchMovie(req, res) {
  const n1 = req.query.name;
  const name = n1.toLowerCase();
  getAll()
    .then((results) => {
      const newResult = [];
      for (const data of results) {
        const title = data.title.toLowerCase();
        if (title.includes(name)) {
          newResult.push(data);
        }
      }
      res.json(newResult);
    })
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function rateMovie(req, res) {
  const rate = req.params.r;
  getAll()
    .then((results) => {
      const newResult = [];
      for (const data of results) {
        const rating = data.Movie_Rating;
        if (rating >= rate) {
          newResult.push(data);
        }
      }
      res.json(newResult);
    })
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function popularMovie(req, res) {
  getAll()
    .then((results) => {
      results.sort(
        (a, b) => parseInt(b.No_of_Ratings) - parseInt(a.No_of_Ratings)
      );
      res.json(results);
    })
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function yearMovie(req, res) {
  getAll()
    .then()
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function directorMovie(req, res) {
  getAll()
    .then()
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function actorMovie(req, res) {
  getAll()
    .then()
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}
function freeMovie(req, res) {
  getAll()
    .then((results) => {
      const free = [];
      const paid = [];
      for (const data of results) {
        if (data.Price === "") {
          free.push(data);
        } else {
          paid.push(data);
        }
      }
      paid.sort((a, b) => a.Price - b.Price);
      free.sort((a, b) => b.Movie_Rating - a.Movie_Rating);
      const newResult = free.concat(paid);
      res.json(newResult);
    })
    .catch((e) => {
      res.status(500).json({ error: "An error occured!" });
    });
}

module.exports = {
  getAllMovies,
  searchMovie,
  rateMovie,
  popularMovie,
  yearMovie,
  directorMovie,
  actorMovie,
  freeMovie,
};

//   let pg = parseInt(req.query.pg) || 0;
//   let item = parseInt(req.query.item) || 5;
//   const ressize = data.length;
//   let startIndex = (pg - 1) * item;
//   const newResult = [];
//   if (startIndex >= ressize) {
//     if (item > ressize) item = 5;
//     startIndex = ressize - (ressize % item ? ressize % item : item);
//     if (pg * item > ressize) pg = Math.floor(ressize / item) + 1;
//   }
//   for (let i = startIndex; i < item + startIndex; i++) {
//     newResult.push(data[i]);
//   }
//   let totalpages = Math.floor(ressize / item) + 1;
//   res.status(200).json({
//     pageno: pg,
//     totalpages: totalpages,
//     totalItems: ressize,
//     data: newResult,
//   });
