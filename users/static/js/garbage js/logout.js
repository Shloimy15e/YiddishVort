import { getCsrfToken } from './utils.js';
/**
 * Logs out the user.
 * @param {string} refresh - The refresh token of the user.
 * @returns {Promise<Object>} - A promise that resolves to the response JSON object.
 * @throws {Error} - If there is a network response error.
 */
async function logout(refreshToken) {
    try {        
        const response = await fetch('/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
            body: JSON.stringify({ refreshToken }),
        });
        const data = await response.json();
        if (response.status !== 205) {
            // Throw an error if the logout request fails
            throw new Error(response.detail);
        } 
        return  await response.json();
    } catch (error) {
        throw error;
    }
}

export {logout};

