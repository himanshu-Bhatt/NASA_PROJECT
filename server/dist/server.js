import { mongoConnect } from "./services/mongo.js";
import http from "http";
import mongoose from "mongoose";
import { app } from "./app.js";
import { loadPlanets } from "./models/planets.model.js";
import { launchData } from "./models/launches.model.js";
const PORT = 8000;
const server = http.createServer(app);
mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
});
mongoose.connection.on("error", () => {
    console.error("Error while connecting to mongoDB");
});
async function startServer() {
    await mongoConnect();
    await loadPlanets();
    await launchData();
    server.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map