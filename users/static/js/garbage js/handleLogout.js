import { logout } from "./logout.js";
import {handleError} from "./handleError.js";
import {deleteUserData} from "./localStorage.js";
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshString = JSON.stringify({ refreshToken })
    alert('refreshToken: ' + refreshString);
    try {
        await logout(refreshToken);
        deleteUserData();
        alert('2. You have been logged out successfully.');
        window.location.href = '/login/';
    } catch (error) {
        const message = error;
        console.log(message);
        errorMessage.textContent = message;
    }

});
