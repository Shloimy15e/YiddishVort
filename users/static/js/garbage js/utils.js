/**
 * Get the CSRF token from the form.
 * @returns {string} - The CSRF token.
 */
function getCsrfToken() {
    const form = document.querySelector('form');
    const csrfToken = form ? form.querySelector('[name=csrfmiddlewaretoken]') : null;
    return csrfToken ? csrfToken.value : '';
}

export { getCsrfToken };