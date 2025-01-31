import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadoncloudinary } from "../utils/FileHandling.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const Registeruser = asyncHandler(async (req, res) => {

    // Steps to register a user are:
    /*
    -> Get user details from POSTMAN
    -> Validation and correct format - Not empty
    -> Check if user is already present : User name and email
    -> image and avtar are present or not?
    -> Upload to cloudinary , avtar hua ki nhi(multer -> cloudinary)
    -> create user object - create entry in DB
    -> Remove password and refreshtoken field from response.
    -> Chk for user creation
    -> return response
    */
    
    const { username, email, fullName, password } = req.body
    if(!username || !email || !fullName || !password) {
        throw new ApiError(400, "Please provide all the details");
    } 
    // It is used to check if the user with same email or name exists or not using an inbuilt function of mongoose which is accessible
    // using the User which ahs been imported and has a func findOne to check for the user details in database.
    // A new syntax to check for either of username or Email id in the data abse and if occur we throw a customized error
    const userExists = await User.findOne({
        $or: [{ username }, { email }]
        
    })

    // Error thrown =>
    if(userExists) {
        throw new ApiError(409, "User already exists");
    }
    // Files are being requested from the frontend i.e the req.body files i.e the images which are the 
    // avatar and the coverImage using this syntax means
    /*	
    •	req.files → This is expected to contain uploaded files.
	•	?. (Optional Chaining) → If req.files does not exist, the expression returns undefined instead of throwing an error.
	•	req.files?.avtar → This checks if req.files has a property named avtar. If not, it returns undefined.
	•	req.files?.avtar[0] → Tries to access the first file in the avtar array. If avtar is undefined, this returns undefined instead of causing an error.
	•	req.files?.avtar[0]?.path → Finally, it tries to access the path property of the first file.
	•	If avtar[0] exists, path is returned.
	•	If not, it safely returns undefined.
    */
    const avtar = req.files?.avtar[0]?.path;
    const coverImage = req.files?.coverImage[0]?.path;
    if(!avtar || !coverImage) {
        throw new ApiError(400, "Please provide Avtar image & coverImage");
    }

    // this is a function of uploading the files to the cloudinary and it returns a URL back to this variable. 
    // The code is written at this directory => (src/utils/FileHandling.js).
    const avtarPath = await uploadoncloudinary(avtar);
    const coverImagePath = await uploadoncloudinary(coverImage);
    if(!avtarPath || !coverImagePath) {
        throw new ApiError(400, "Please provide Avtar image & coverImage");
    }


    // The pre Save Hook written in user.model.js which is used to encrypt the password is used 
    // to be called here automatically using the .create function and usually encrypt the password 
    // before saving to the database. 
    const user = await User.create({
        username,
        email,
        fullName,
        avatar: avtarPath.url,
        coverImage: coverImagePath.url,
        password
    })
    res.status(201).json({
        success: true,
        user
    })
    // Added by me to check what response i am getting may throw error
    // console.log(res);
    // . select is used to remove the things which are not required in the response sent by the database.
    // This is a syntax and a new approach to remove the fields but we can also achieve by removing it from User directly also.
    const user1 = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // console.log(user1);
    if (!user1) {
        throw new ApiError(404, "User not found");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user1,
            
        )
    )

    

})
// => Continue <= 
const loginUser = asyncHandler(async (req, res) => { 
    /*
        steps to follow are:
        -> take the data from req body
        1) email id and password login
        3) check from database is the details are valid and correct.
        4) if correct allow the user
        2) generate the access token with validity of 15min and refresh token of validity of 1 day.
        -> send cookies.

    */
    
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        throw new ApiError(400, "Please provide all the details");
    }
    // Searching the database for the details of the user.
    const user1 = await User.findOne({
        $or: [{ username }, { email }]
    })
    // printing what the findone function returns
    // console.log(user1);
    if (!user1) {
        throw new ApiError(404, "User not found");
    }
    // To find the functions generated by the coder we have to use the 
    // instance which is given back by the database to the user i.e the user1 
    // and not the User(which is basically contact the mongo db functions)
    const isPasswordCorrect = await user1.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }
    // Saving the access token and the refresh token in the cookie parser which is
    // basically declared in the app.js file and stores the cookies which are generated by the user.
    const accessToken = user1.generateAccessToken();
    const refreshToken = user1.generateRefreshToken();
    user1.refreshToken = refreshToken;
    // await user1.save({ validateBeforeSave: false });
    // Validatebeforesave is not required as it just basically matches the conditions with the user schema that weather the details added are 
    // matched to the schema or not.
    await user1.save();
    // We are creating a new instance of the user taking by id from the database and 
    // the .select method is used so that when we get the instance then the password and refreshtoken are not required by us to use.
    // so we get the loggedInUser instance.
    const loggedInUser = await User.findOne({ _id: user1._id }).select("-password -refreshToken");  
    
    // Adding the cookies of the refresh token and access token to the cookie parser
    // It is necessary to access the accesstoken easily from the cookies for the login purpose and also th refreshtoken for loggin purpose.

    /*
    1.	httpOnly: true
	•	Prevents JavaScript from accessing the cookie in document.cookie.
	•	Prevents XSS (Cross-Site Scripting) attacks since malicious scripts can’t steal the cookie.
	•	Only the server can read or modify this cookie.
	2.	secure: true
	•	Ensures that the cookie is only sent over HTTPS (not HTTP).
	•	Prevents attackers from intercepting sensitive data over unsecured connections.
	•	If the request is made over HTTP, the cookie won’t be sent.
     */
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200, 
            {
                message: "User logged in successfully",
                // Sending the access token and refresh token to the user so that user can save it locally i.e when developing the android app or something
                user: loggedInUser, accessToken , refreshToken
            }
        )
    )


    



})



const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(
            200, 
            {
                message: "User logged out successfully",
            }
        )
    )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken = req.cookies.refreshToken;

    if (incommingRefreshToken) {
        throw new ApiError("401", "Unauthorized");
    }
    const decoded = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded?._id).select("-password -refreshToken")
    if(!user) {
        throw new ApiError(401, "invalid refresh token");

    }
    if(incommingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "invalid refresh token");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200, 
            {
                message: "User logged out successfully",
            }
        )
    )

})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                message: "Password changed successfully",
            }
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user fetched")
    );
});

const updateaccount = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;
    const user = await User.findById(req.user._id);
    user.fullName = fullName;
    user.email = email;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                message: "User details updated successfully",
                user
            }
        )
    )
})

const updateuseravatar = asyncHandler(async (req, res) => {
    const avtar = req.file?.avtar[0]?.path;
    if(!avtar) {
        throw new ApiError(400, "Please provide Avtar image");
    }
    const avtarPath = await uploadoncloudinary(avtar);
    if(!avtarPath) {
        throw new ApiError(400, "Please provide Avtar image");
    }
    const user = await User.findById(req.user._id);
    user.avatar = avtarPath.url;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                message: "User Avtar updated successfully",
                user
            }
        )
    )
})
const updatecoverimage = asyncHandler(async (req, res) => {
    const coverImage = req.file?.coverImage[0]?.path;
    if(!coverImage) {
        throw new ApiError(400, "Please provide coverImage image");
    }
    const coverImagePath = await uploadoncloudinary(coverImage);
    if(!coverImagePath) {
        throw new ApiError(400, "Please provide coverImage image");
    }
    const user = await User.findById(req.user._id);
    user.coverImage = coverImagePath.url;
    await user.save();
    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                message: "User coverImage updated successfully",
                user
            }
        )
    )
})

export { Registeruser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateaccount, updateuseravatar, updatecoverimage }
    