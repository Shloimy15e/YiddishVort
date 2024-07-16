/**
 * Get the CSRF token from the form.
 * @returns {string} - The CSRF token.
 */
function getCsrfToken() {
    const form = document.querySelector('form');
    const csrfToken = form ? form.querySelector('[name=csrfmiddlewaretoken]') : null;
    return csrfToken ? csrfToken.value : '';
}

/**
 * Takes any number of arguments for input and returns if its valid
 * @param {any} input - Any number of arguments for input
 */

function validateInput(...input) {
    // check if any of the inputs are empty
    if (input.some(input => input.trim() === '')) {
        throw new Error('Please fill in all the fields');
    }
}

export { getCsrfToken, validateInput };