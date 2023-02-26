// const { pipeline } = require("node:stream");
// const fs = require("fs");
// const { parse } = require("csv-parse");
import fs from "fs";
import { parse } from "csv-parse";
import { planetModel } from "./planets.mongo.js";
const result = [];
const isHabitablePlanet = (planet) => {
    // console.log(planet);
    return (planet["koi_disposition"] === "CONFIRMED" &&
        Number(planet["koi_insol"]) > 0.36 &&
        Number(planet["koi_insol"]) < 1.11 &&
        Number(planet["koi_prad"]) < 1.6);
};
let count = 0;
function loadPlanets() {
    return new Promise((resolve, reject) => {
        const readS = fs.createReadStream("/home/himanshu/nodejs/node_course_ts/NASA_project/nasa-front-end/server/src/models/kepler_data.csv");
        // console.log(readS);
        readS
            .pipe(parse({
            comment: "#",
            columns: true,
        }))
            .on("data", async (data) => {
            // console.log(data);
            if (isHabitablePlanet(data)) {
                // console.log(data);
                count++;
                savePlanet(data);
            }
        })
            .on("error", (err) => {
            console.error(err);
            reject();
        })
            .on("end", async () => {
            const planetsCount = (await getAllPlanets()).length;
            console.log(`${planetsCount} planets found`);
            console.log(`${count} planets found`);
            // console.log(result);
            resolve();
        });
    });
}
export const getAllPlanets = async () => {
    return await planetModel.find({});
};
const savePlanet = async (planet) => {
    try {
        await planetModel.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    }
    catch (err) {
        console.error(err);
    }
};
export { result, loadPlanets };
//# sourceMappingURL=planets.model.js.map