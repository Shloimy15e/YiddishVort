document.addEventListener('DOMContentLoaded', () => {
    alert('js loaded');
});
const loginSubmit = document.getElementById('login-submit');
const errorMessage = document.getElementById('error-message');
loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    alert('hello');
    /* Get the username and password from the form
    and use fetch to send a POST request to the server
    with the data and expect a JWT token as a response.
    If the request is successful, save the token in the
    localStorage and redirect the user to the home page.
    */
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        validateInput(username, password);

        const token = await login(username, password);

        storeUserData(user, token);

        window.location.href = '/';
    } catch (error) {
        errorMessage.textContent = getErrorMessage(error);
        console.error(error);
    } finally {
        loginSubmit.disabled = false;
    }
}
);

function getCsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

function validateInput(username, password){
    if (username === '') { throw new Error('Please enter a username'); }
    if (password === '') { throw new Error('Please enter a password'); }
}

async function login(username, password) {            
    // If all data was entered create a loginData object
    const loginData = { username, password };
    const csrfToken = getCsrfToken();
    // Disable the login button to prevent multiple login requests
    loginSubmit.disabled = true;

    const response = await fetch('/api/auth/login/', {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
          },
          body: JSON.stringify(loginData)
    })
    if (!response.ok) {
        throw new Error('Network response error: ' + response.status + ' ' + response.statusText);
    }
    
    // Get the token from the response
    const data = await response.json();
    const access_token = data.access;
    const refresh_token = data.refresh;
    const user = data.user;
    // Return the tokens and user information
    return (access_token, refresh_token, user);
}

function getErrorMessage(error) {
    // Get the error message from the error object and return user friendly error message
    return error.message;
}

function storeUserData(user, token) {
    // Get the user data and store it in localStorage 
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}