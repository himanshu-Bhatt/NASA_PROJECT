import { ByteLengthQueuingStrategy } from "node:stream/web";

export const launches = new Map();
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler exploration 1",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

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

export const addNewLaunch = (launch: {
  mission: string;
  launchDate: Date;
  destination: string;
}) => {
  latestFlightNumber++;
  launches.set(latestFlightNumber, {
    ...launch,
    success: true,
    upcoming: true,
    customers: ["Zero To Mastery", "NASA"],
    flightNumber: latestFlightNumber,
  });
  return launches.get(latestFlightNumber);
};
export const _abortLaunch = (id: number) => {
  let launch = launches.get(id);
  launch.success = false;
  launch.upcoming = false;
  return launch;
  
};
launches.set(launch.flightNumber, launch);
