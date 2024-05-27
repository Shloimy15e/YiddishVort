/** 
 * Stores the user data in localStorage.
 * @param {string} user - The user object returned from the server.
 * @param {string} accessToken - The access token returned from the server.
 * @param {string} refreshToken - The refresh token returned from the server.
 * @returns {void}
 */ 
function storeUserData(user, accessToken, refreshToken) {
    // Store the user data in localStorage
    localStorage.setItem('user', user);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

/**
 * Deletes the user data from localStorage.
 */
function deleteUserData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
}

export { storeUserData, deleteUserData };