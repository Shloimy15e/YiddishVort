import { login } from './login.js';
import { storeUserData } from './localStorage.js';
import { getCsrfToken, validateInput } from './utils.js';
import { stringifyInput } from './stringifyInput.js';

const loginSubmitButton = document.getElementById('login-submit');
const errorMessage = document.getElementById('error-message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// listen for click event on login and call handleLogin function
loginSubmitButton.addEventListener('click', handleLogin); 
/**
 * Handles the login form submission, sends a POST request to the server, and processes the response.
 * @param {Event} event - The click event triggering the form submission.
 */
async function handleLogin(event) {
    event.preventDefault();
    try {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const csrfToken = getCsrfToken();

        validateInput(username, password);

        loginSubmitButton.disabled = true;

        const { user, accessToken, refreshToken } = await login(username, password, csrfToken);
                
        storeUserData(user, accessToken, refreshToken);
        console.log(refreshToken);

        window.location.href = '/';
    } catch (error) {
        let stringError = stringifyInput(error);
        errorMessage.textContent = stringError;
        console.error(stringError);
        console.error(error);
    } finally {
        loginSubmitButton.disabled = false;
    }
};
