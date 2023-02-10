// const { pipeline } = require("node:stream");
// const fs = require("fs");
// const { parse } = require("csv-parse");

import { pipeline } from "node:stream";
import fs from "fs";
import { open } from "node:fs/promises";
import { parse } from "csv-parse";

const result = [];

const isHabitablePlanet = (planet: {
  koi_disposition: string;
  koi_insol: string;
  koi_prad: string;
}) => {
  // console.log(planet);

  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    Number(planet["koi_insol"]) > 0.36 &&
    Number(planet["koi_insol"]) < 1.11 &&
    Number(planet["koi_prad"]) < 1.6
  );
};

function loadPlanets() {
  return new Promise<void>((resolve, reject) => {
    const readS = fs.createReadStream(
      "/home/himanshu/nodejs/node_course_ts/NASA_project/nasa-front-end/server/src/models/kepler_data.csv"
    );
    // console.log(readS);

    readS
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        // console.log(data);
        if (isHabitablePlanet(data)) {
          result.push(data);
          // console.log(data);
        }
      })
      .on("error", (err) => {
        console.error(err);
        reject();
      })
      .on("end", () => {
        console.log("finished reading");
        // console.log(result);
        resolve();
      });
  });
}

// (async () => {
//   const readS = fs.createReadStream(
//     "/home/himanshu/nodejs/node_course_ts/NASA_project/nasa-front-end/server/src/models/kepler_data.csv"
//   );

//   readS
//     .pipe(
//       parse({
//         comment: "#",
//         columns: true,
//       })
//     )
//     .on("data", (chunk) => {
//       if (isHabitablePlanet(chunk)) result.push(chunk);
//     })
//     .on("end", () => {
//       console.log("finished reading");
//       console.log(result);
//     });
// })();
export { result, loadPlanets };
// (async () => {
//   // const readS = await open(__dirname + "/test.txt");
//   const readS = fs.createReadStream(
//     "/home/himanshu/nodejs/node_course_ts/NASA_project/nasa-front-end/server/src/models/kepler_data.csv"
//   );
// })();
// export { result };
