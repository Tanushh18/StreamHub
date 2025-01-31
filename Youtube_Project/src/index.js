// require('dotenv').config({ path: './Youtube_Project /.env'});
import dotenv from "dotenv";
import app from "./app.js";

import connectDb from "./db/index.js";


dotenv.config({
    path: "./Youtube_Project/.env"
});
connectDb()
.then(() => { app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${process.env.PORT}`) })})
.catch((error) => console.log(error));


