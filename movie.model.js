const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

function getAll() {
  let results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, ".", "data", "movies_data.csv"))
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        resolve(results);
      });
  });
  //   await fs
  //     .createReadStream(path.join(__dirname, ".", "data", "movies_data.csv"))
  //     .pipe(csv())
  //     .on("data", (data) => {
  //       results.push(data);
  //     })
  //     .on("error", (err) => {
  //       console.log(err);
  //     })
  //     .on("end", () => {
  //       return results;
  //     });
}

module.exports = { getAll };
