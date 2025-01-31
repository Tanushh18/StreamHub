// It basically extends the inbuilt error class of teh javaScript which is used to handle the 
// custom errors in the API by providing the additional properties.
// By extending Error, we can create a custom error object with additional properties relevant to API responses.
class ApiError extends Error {
    // Parameters explained:
	// 1.	statusCode: The HTTP status code (e.g., 404 for Not Found, 500 for Internal Server Error).
	// 2.	message: A descriptive error message (default: "Something Went Wrong").
	// 3.	errors: An array to hold additional error details (e.g., validation errors).
	// 4.	stack: A string containing the stack trace for debugging (default is an empty string).
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        /*this.statusCode = statusCode; → Stores the provided HTTP status code (e.g., 400, 500).
	•	this.data = null; → A placeholder for potential data (if needed later).
	•	this.message = message; → Stores the custom error message.
	•	this.success = false; → Indicates that the API request was not successful (useful for consistent API responses).
	•	this.errors = errors; → Stores additional error details (e.g., form validation errors).
    •	this.stack = stack; → Stores the stack trace for debugging (if provided).*/
        
        
    // it is basically used to track the coordinates where the error occured i.e provided either by the user or automatically by the compiler 
    /* 
    sample of the stack trace is
    Error: Internal Server Error
    at Object.<anonymous> (/path/to/your/file.js:25:15)
    at Module._compile (node:internal/modules/cjs/loader:1215:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1271:10)
    at Module.load (node:internal/modules/cjs/loader:1082:32)
    at Function.Module._load (node:internal/modules/cjs/loader:937:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
    */
        
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }

    }
            
}

export default ApiError