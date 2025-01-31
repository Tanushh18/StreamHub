import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
// JWT token is used to create the tokens using the cryptography 
import bcrypt from "bcrypt"
// Bcrypt library is used to hash the password so that it is not directly available in the database for access
// We create the Schema to basically show how thw data will be stored in the database with the rules given below for the particular type of field.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            // To enable the searching field in the database then we have to enable the index option to be true.
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video" // video model
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        // We are not storing the access token in the data base it is stored in the cookies directly.
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)
// This is a prehook which is executed just before the action to take place
// i.e the saving of data means just before the data is saved we enable the 
// encryption of the data i.e adding the password to it.
// This method is used to encrypt the password in database.

// The use of this prehook is basically to encrypt the password when we click on save button and if password is modified we encrypt it before saving.
// so we have used a await as it may take time to save the info in database.
userSchema.pre("save", async function (next) {
    // if the password is not modified we directly move to next function and the password remains encrypted.
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// This method is used to check if the user has entered a correct password or not for login purpose.
// it compares by taking the password from user and compare function is used to compare it with this.password.
// The user reference is passed when the function is basically called from the controllers using the way
// user1.isPasswordCorrect(password) and user1 is found by findOne function of mongoose.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
// This is basically used to generate a hash code using the cryptography
// which is used to give access to the person who is accesing the details.
// It basically helps in easy verifying the user.
// it is a short duration token

    /**
     * Generates a short-lived access token for the user.
     * The token contains the user's ID, email, username, and full name.
     * The token is signed with a secret key stored in the ACCESS_TOKEN_SECRET environment variable.
     * The token expires after a duration specified by the ACCESS_TOKEN_EXPIRY environment variable.
     * returns {string} The generated access token.
     */
// 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
/*This code generates a refresh token for a user using the JWT (JSON Web Token)
library. The token contains the user's ID and expires after a duration 
specified by the REFRESH_TOKEN_EXPIRY environment variable. The token is 
signed with a secret key stored in the REFRESH_TOKEN_SECRET environment 
variable.
It is a long duration token compartive.
*/

/**
 * Generates a long-lived refresh token for the user.
 * The token contains the user's ID and is signed with a secret key stored in the REFRESH_TOKEN_SECRET environment variable.
 * The token's expiration is determined by the REFRESH_TOKEN_EXPIRY environment variable.
 * This refresh token is used to obtain new access tokens, allowing the user to stay logged in without re-entering credentials.
 * returns {string} The generated refresh token.
 */

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

/*In summary, access tokens are used for authentication and authorization, 
while refresh tokens are used to obtain new access tokens when they expire,
allowing users to stay logged in without re-entering their credentials.*/

// it exports the user schema using this syntax.
export const User = mongoose.model("User", userSchema)