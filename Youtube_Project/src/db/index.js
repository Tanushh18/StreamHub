import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.Mongo_DB_URL}/${DB_NAME}`)
        console.log("DB connected successfully" + connectionInstance.connectionhost);
        // Print the Connection Instance to get some knowledge.
    } catch (error) {
        console.log(error)
        // throw new Error("DB connection failed")
        process.exit(1);
    }
}
export default connectDb;