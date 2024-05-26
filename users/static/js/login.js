/**
 * Handles the login form submission, sends a POST request to the server, and processes the response.
 * @param {Event} e - The click event triggering the form submission.
 */
const loginSubmit = document.getElementById('login-submit');
const errorMessage = document.getElementById('error-message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    /* Get the username and password from the form
    and use fetch to send a POST request to the server
    with the data and expect a JWT token as a response.
    If the request is successful, save the token in the
    localStorage and redirect the user to the home page.
    */
    try {
        const username = usernameInput.value;
        const password = passwordInput.value;

        validateInput(username, password);

        const { user, access, refresh } = await login(username, password);
                
        storeUserData(user, access, refresh);

        window.location.href = '/';
    } catch (error) {
        errorMessage.textContent = getErrorMessage(error);
        console.error(error);
    } finally {
        loginSubmit.disabled = false;
    }
}
);

function validateInput(username, password){
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
    const loginData = { username, password };
    const csrfToken = getCsrfToken();

    const response = await fetch('/api/auth/login/', {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
          },
          body: JSON.stringify(loginData)
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Network response error: ' + errorData.error);
    }
    
    // Get the token from the response
    return response.json();
}

function getErrorMessage(error) {
    // Get the error message from the error object and return user friendly error message
    return error.message;
}

function getCsrfToken() {
    // Get the CSRF token from the form
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

function storeUserData(user, access, refresh) {
    // Store the user data in localStorage
    localStorage.setItem('user', user);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    
}