/**
 * Takes an error caught by a failed try and if needed parses it 
 * or if not returns it as is. 
 * @param {object} error 
 */
function stringifyInput(input) {
    // Check if input is a string
    if (input instanceof Error) {
        return input;
    }
    else if (typeof input === 'object' && input!== null) {
        return JSON.stringify(input);
    }
    return input;
}

export { stringifyInput };