import { login, validateInput } from './login.js';
import { handleError } from './handleError.js';
import { storeUserData } from './localStorage.js';

const loginSubmit = document.getElementById('login-submit');
const errorMessage = document.getElementById('error-message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

/**
 * Handles the login form submission, sends a POST request to the server, and processes the response.
 * @param {Event} event - The click event triggering the form submission.
 */
async function handleLogin(event) {
    event.preventDefault();
    try {
        const username = usernameInput.value;
        const password = passwordInput.value;

        validateInput(username, password);
        loginSubmit.disabled = true;

        const { user, accessToken, refreshToken } = await login(username, password);
                
        storeUserData(user, accessToken, refreshToken);
        alert(localStorage.getItem('refreshToken'));
        window.location.href = '/';
    } catch (error) {
        const message = error
        errorMessage.textContent = message;
    } finally {
        loginSubmit.disabled = false;
    }
};

loginSubmit.addEventListener('click', handleLogin);