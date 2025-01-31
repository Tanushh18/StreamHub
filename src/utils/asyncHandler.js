const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
export { asyncHandler }
/*-> In the backend when we write a /instagram type in the api then we use the 4 types i.e the (err , req , res , next) where next is used when we have to use a middleware between the request sender and response receiver to know weather it is a valid entry or not.
-> Middle ware next is a flag of boolean type to move to next middleware*/

// we are accepting a function into a function and this type isknown as Higher Order function which is basically used and the syntax is given below.
// This is a type of Try-Catch block type

// const asyncHandler1 = (fn) => async(req , res , next) =>  {
//     try {
//         await fn(req , res , next)
//     }
//     catch (error) {
//     res.status(err.code || 500).json({message : err.message , success : false})
//     }
// }