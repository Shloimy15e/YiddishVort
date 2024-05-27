import { getCsrfToken } from './utils.js';

/**
 * Validates the input fields.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @throws {Error} - If the input fields are empty.
 */
function validateInput(username, password) {
    if (username === '') { throw new Error('Please enter a username'); }
    if (password === '') { throw new Error('Please enter a password'); }
}

/**
 * Logs in a user with the provided username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the response JSON object.
 * @throws {Error} - If there is a network response error.
 */
async function login(username, password) {
    try {
        const loginData = { username, password };
        const csrfToken = getCsrfToken();

        const response = await fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(loginData),
        })
        if (response.status !== 200) {
            throw new Error(response.error);
        }
        // Get the token from the response
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export { login, validateInput,};