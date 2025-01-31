// Basic way to interact with the mongo Db database
//The Schema class is used to define the structure (blueprint) of documents stored in a MongoDB collection.
import mongoose, { Schema } from "mongoose";
//This is a Mongoose plugin that provides 
// pagination capabilities when using MongoDB’s aggregation framework.

// -> The pagination is basically of retriving the data from teh database in a small chunks which is efficient and faster instead of loading everything at once.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)
/*By applying the mongooseAggregatePaginate plugin, your schema (videoSchema) 
gains access to a special method called aggregatePaginate(), which allows you 
to efficiently paginate results from complex aggregation queries.

Instead of manually handling pagination using MongoDB’s $skip and $limit, the
plugin provides a convenient way to:
	1.	Automatically apply pagination logic.
	2.	Generate pagination metadata (like total pages, next/previous pages).
	3.	Avoid redundant code when implementing pagination.

*/

export const Video = mongoose.model("Video", videoSchema)