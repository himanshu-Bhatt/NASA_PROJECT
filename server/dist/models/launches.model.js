import { launchModel } from "./launches.mongo.js";
import { planetModel } from "./planets.mongo.js";
import axios from "axios";
const DEFAULT_LAUNCH_NUMBER = 100;
export const launches = new Map();
let latestFlightNumber = 100;
/*
 flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    destination: string;
    customer: string[];
    upcoming: boolean;
    success: boolean;

*/
export const saveLaunch = async (launch) => {
    await launchModel.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, { upsert: true });
};
const getLatestFlightNumber = async () => {
    const launch = await launchModel.findOne().sort("-flightNumber");
    if (!launch) {
        return DEFAULT_LAUNCH_NUMBER;
    }
    return launch.flightNumber;
};
export const findLaunch = async (launch) => {
    const res = await launchModel.findOne(launch);
    return res;
};
export const getLaunch = async (_flightNumber) => {
    const launch = findLaunch({ flightNumber: _flightNumber });
    return launch;
};
export const scheduleNewLaunch = async (launch) => {
    const planet = await planetModel.findOne({ keplerName: launch.target });
    if (!planet) {
        throw new Error("No matching exo-planet found");
    }
    const flight_num = (await getLatestFlightNumber()) + 1;
    const _launch = {
        ...launch,
        success: true,
        upcoming: true,
        customers: ["Zero To Mastery", "NASA"],
        flightNumber: flight_num,
    };
    saveLaunch(_launch);
};
// export const addNewLaunch = (launch: {
//   mission: string;
//   launchDate: Date;
//   destination: string;
// }) => {
//   latestFlightNumber++;
//   launches.set(latestFlightNumber, {
//     ...launch,
//     success: true,
//     upcoming: true,
//     customers: ["Zero To Mastery", "NASA"],
//     flightNumber: latestFlightNumber,
//   });
//   return launches.get(latestFlightNumber);
// };
export const _abortLaunch = async (id) => {
    const aborted = await launchModel.updateOne({ flightNumber: id }, { success: false, upcoming: false });
    return aborted.modifiedCount === 1 && aborted.acknowledged === true;
};
const apiUrl = "https://api.spacexdata.com/v4/launches/query";
const populateLaunches = async () => {
    const response = await axios.post(apiUrl, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1,
                    },
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1,
                    },
                },
            ],
        },
    });
    if (response.status !== 200) {
        throw new Error("Problem occured while retrieving launches");
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc["payloads"];
        const customers = payloads.flatMap((payload) => {
            return payload["customers"];
        });
        // console.log(customers);
        const launch = {
            flightNumber: launchDoc["flight_number"],
            mission: launchDoc["name"],
            rocket: launchDoc["rocket"]["name"],
            upcoming: launchDoc["upcoming"],
            success: launchDoc["success"],
            customers,
        };
        // console.log(launch);
        console.log(`${launch.flightNumber}  ${launch.mission}`);
        await saveLaunch(launch);
    }
};
export const launchData = async () => {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat",
    });
    if (firstLaunch) {
        console.log(firstLaunch);
        console.log("Launch data already loaded");
    }
    else {
        await populateLaunches();
    }
};
//# sourceMappingURL=launches.model.js.map