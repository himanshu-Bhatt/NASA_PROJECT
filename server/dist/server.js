import http from "http";
// const http = require("http");
// const _app = require("./app.ts");
import { app } from "./app.js";
import { loadPlanets } from "./models/planets.model.js";
// import "REQUEST,RESPONSE" from "@types/express";
// import { app as _app } from "./app";
const PORT = 8000;
const server = http.createServer(app);
await loadPlanets();
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=server.js.map