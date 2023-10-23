const { getAllMovies } = require("./movie.model");

function httpGetAllMovies(req, res) {
  getAllMovies()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).json({ error: "An Error Occured!" });
    });
}

module.exports = { httpGetAllMovies };

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
