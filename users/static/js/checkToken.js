const checkTokenButton = document.getElementById('check-token-button');

checkTokenButton.addEventListener('click', async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');    
        alert('refreshToken: ' + refreshToken);
        alert('accessToken: ' + accessToken);
    } catch (error) {
        alert('Error: ', error);
    }
});