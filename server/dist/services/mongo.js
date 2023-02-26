import mongoose from "mongoose";
const MONGO_URL = "mongodb+srv://himanshu123:himanshu123@cluster0.9nbnp5o.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8000;
mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
});
mongoose.connection.on("error", () => {
    console.error("Error while connecting to mongoDB");
});
export const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL);
};
//# sourceMappingURL=mongo.js.map