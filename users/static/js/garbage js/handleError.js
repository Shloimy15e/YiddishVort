/**
 * Handle errors and return a user-friendly message and redirect if needed.
 * @param {Error} error - The error object.
 * @throws {Error} - If there is a network response error.
 * @returns {string} - The error message.
 */
function handleError(error) {
    if (error.response) {
        return error.response;
    }  else if (error.request) {
        alert('Network error. Please check your connection.');
        throw new Error('Network error. Please check your connection.');
    } else {
        alert(error);
        throw new Error('An error occurred. Please contact us if the problem persists.');
    }
}

export { handleError };