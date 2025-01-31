import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Cors is a middle ware which is used to basically help the frontend and backend to work on the same port so that they can interact with each other.

app.use(cors(
    {
        origin: process.env.Corsorigin,
        Credential : true,

    }
))
// express.json is used to basically accept the data from the user in form of json format
app.use(express.json(
    {
        limit: "50mb"
    }
));
// Multer is used for file uploading
app.use(express.urlencoded(
    {
        limit: "50mb",
        extended: true
    }
))
// is used to keep the pdf files and docs copy on my database for accessing and is basically a public assests
app.use(express.static("public"))
app.use(cookieParser())



// Routes
import userRouter from "./routes/user.routes.js";

// Routers
app.use("/api/v1/users", userRouter)




export default app;