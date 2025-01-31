//This defines a class named ApiResponse, which is meant to format the response that your API sends back to the client.

/*

Summary of the ApiResponse Class:

This class standardizes the response structure for your API and ensures that every response sent from the server follows a consistent format.
	•	statusCode: HTTP status code (e.g., 200, 404, 500).
	•	message: A descriptive message (defaults to "Success" if not provided).
	•	data: The actual data returned in the response (optional).
	•	success: A boolean that indicates whether the request was successful based on the statusCode.

Why Use the ApiResponse Class?
	•	Consistency: Every API response follows the same structure, making it easier for clients to handle the responses.
	•	Clear Communication: The statusCode, message, and success fields make it clear whether the request was successful or not, and provide context (e.g., a description of the result).
	•	Maintainability: If you want to change the structure of your API responses, you can modify this class in one place, ensuring consistency across all endpoints.
*/
class ApiResponse {
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export { ApiResponse }